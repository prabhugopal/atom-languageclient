/**
 *  @license   MIT
 *  @copyright OmniSharp Team
 *  @summary   Adds support for https://github.com/Microsoft/language-server-protocol (and more!) to https://atom.io
 */
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { exists, readdir } from 'fs';
import { join, resolve } from 'path';
import { CompositeDisposable, isDisposable } from 'ts-disposables';
import { AutocompleteService, ILanguageClientSettings, LanguageClientSettings, LinterService } from './atom/index';
import { LanguageProvider, LanguageService } from './language/index';
import { ILanguageProvider, ILanguageService } from './services/_internal';
import { IAutocompleteService, ILinterService } from './services/_public';
import { Container } from './di/Container';

const $readdir = Observable.bindNodeCallback(readdir);
const $exists = Observable.bindCallback(exists);

export class AtomLanguageClientPackage implements IAtomPackage<LanguageClientSettings> {
    private _container: Container;
    private _disposable: CompositeDisposable;
    private _settings: LanguageClientSettings;
    private _atomLanguageProvider: LanguageProvider;
    private _atomLanguageService: LanguageService;
    private _atomAutocompleteProvider: AutocompleteService;
    private _atomLinterProvider: LinterService;
    public activated: Promise<void>;

    /* tslint:disable:no-any */
    public activate(settings: ILanguageClientSettings) {
        this._container = new Container();
        this._disposable = new CompositeDisposable();
        this._settings = settings instanceof LanguageClientSettings ? settings : new LanguageClientSettings(settings);

        this._atomLanguageProvider = new LanguageProvider(this._container);
        this._atomLanguageService = new LanguageService(this._container);
        this._atomAutocompleteProvider = new AutocompleteService();
        this._atomLinterProvider = new LinterService();

        this._container.registerInstance(ILanguageProvider, this._atomLanguageProvider);
        this._container.registerInstance(ILanguageService, this._atomLanguageService);
        this._container.registerInstance(IAutocompleteService, this._atomAutocompleteProvider);
        this._container.registerInstance(ILinterService, this._atomLinterProvider);

        this._disposable.add(
            this._container,
            this._atomLanguageProvider,
            this._atomLanguageService
        );

        const activateServices = Observable.merge(
            this._container.registerFolder(__dirname, 'services')
        ).toPromise()
        .then(() => {
            this._container.registerInterfaces();
        });

        this.activated = activateServices;

        /* We're going to pretend to load these packages, as if they were real */
        const pathToPlugins = resolve(__dirname, '../', 'plugins');
        $readdir(pathToPlugins)
            .mergeMap(folders => {
                return Observable.from(folders)
                    .mergeMap(folder => $readdir(join(pathToPlugins, folder))
                        .mergeMap(files => files)
                        .filter(x => _.endsWith(x, 'Package.ts'))
                        .map(x => join(pathToPlugins, folder, _.trimEnd(x, '.ts'))))
                    .map(path => require(path))
                    .map(module => {
                        const cls: { new (): any } = _.find(module, _.isFunction);
                        return new cls();
                    })
                    .map(instance => {
                        if (instance['consume-atom-language-client']) {
                            instance['consume-atom-language-client'](this._atomLanguageService);
                        }
                        if (instance['provide-atom-language']) {
                            this['consume-atom-language'](instance['provide-atom-language']());
                        }
                    });

            });
    }

    /* tslint:disable-next-line:function-name */
    public ['provide-atom-language-client']() {
        return this._atomLanguageService;
    }

    /* tslint:disable-next-line:function-name */
    public ['provide-atom-autocomplete']() {
        return [this._atomAutocompleteProvider];
    }

    /* tslint:disable-next-line:function-name */
    public ['consume-atom-language'](services: ILanguageProvider | ILanguageProvider[]) {
        if (_.isArray(services)) {
            _.each(services, service => {
                this._atomLanguageProvider.add(service);
                if (isDisposable(service)) {
                    this._disposable.add(service);
                }
            });
        } else {
            this._atomLanguageProvider.add(services);
            if (isDisposable(services)) {
                this._disposable.add(services);
            }
        }
    }

    /* tslint:disable-next-line:function-name */
    public ['consume-atom-linter'](service: Linter.IndieRegistry) {
        this._atomLinterProvider.registry = service;
    }

    /* tslint:disable-next-line:no-any */
    public static deserialize(state: ILanguageClientSettings) {
        return new LanguageClientSettings(state);
    }

    public serialize() {
        return this._settings.serialize(AtomLanguageClientPackage);
    }

    public deactivate() {
        this._disposable.dispose();
    }

    public static get version() { return 1; }
}

atom.deserializers.add(AtomLanguageClientPackage);
