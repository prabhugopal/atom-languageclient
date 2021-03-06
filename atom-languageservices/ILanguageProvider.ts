/**
 *  @license   MIT
 *  @copyright OmniSharp Team
 *  @summary   Adds support for https://github.com/Microsoft/language-server-protocol (and more!) to https://atom.io
 */
import { ILanguageProtocolClient } from './ILanguageProtocolClient';
import { ILanguageProtocolClientOptions } from './ILanguageProtocolClientOptions';
import { ILanguageProtocolServerOptions } from './ILanguageProtocolServerOptions';
/* tslint:disable:variable-name no-any */

/**
 * Symbol for the internal LanguageProvider
 */
export const ILanguageProvider = Symbol.for('ILanguageProvider');
/**
 * Defines the interface for providing a language to be consumed
 * http://flight-manual.atom.io/behind-atom/sections/interacting-with-other-packages-via-services/
 */
export interface ILanguageProvider {
    clientOptions: ILanguageProtocolClientOptions;
    serverOptions: ILanguageProtocolServerOptions;
    chooseConnection?: (context: IChooseConnectionContext) => Promise<boolean>;
    onConnected?: (connection: ILanguageProtocolClient) => void;
    dispose?: () => void;
}

export interface IChooseConnectionContext {
    editor: Atom.TextEditor;
    connections: ILanguageProtocolClient[];
}
