"use strict";
/**
 *  @license   MIT
 *  @copyright OmniSharp Team
 *  @summary   Adds support for https://github.com/Microsoft/language-server-protocol (and more!) to https://atom.io
 */
/* tslint:disable:no-any */
var _ = require('lodash');
var createObservable_1 = require('./createObservable');
function observeCallback(method, thisContext) {
    method = _.bind(method, thisContext);
    return createObservable_1.createObservable(function (observer) {
        var disposable = method(function (item) {
            observer.next(item);
        });
        return function () { return disposable.dispose(); };
    });
}
exports.observeCallback = observeCallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2ZUNhbGxiYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvb2JzZXJ2ZUNhbGxiYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBQ0gsMkJBQTJCO0FBQzNCLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLGlDQUFpQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRXRELHlCQUFtQyxNQUFvRCxFQUFFLFdBQWdCO0lBQ3JHLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNyQyxNQUFNLENBQUMsbUNBQWdCLENBQUksVUFBQSxRQUFRO1FBQy9CLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFDLElBQUk7WUFDM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxjQUFNLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFwQixDQUFvQixDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVRlLHVCQUFlLGtCQVM5QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqICBAbGljZW5zZSAgIE1JVFxyXG4gKiAgQGNvcHlyaWdodCBPbW5pU2hhcnAgVGVhbVxyXG4gKiAgQHN1bW1hcnkgICBBZGRzIHN1cHBvcnQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvbGFuZ3VhZ2Utc2VydmVyLXByb3RvY29sIChhbmQgbW9yZSEpIHRvIGh0dHBzOi8vYXRvbS5pb1xyXG4gKi9cclxuLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgSURpc3Bvc2FibGUgfSBmcm9tICd0cy1kaXNwb3NhYmxlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZU9ic2VydmFibGUgfSBmcm9tICcuL2NyZWF0ZU9ic2VydmFibGUnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVDYWxsYmFjazxUPihtZXRob2Q6IChjYWxsYmFjazogKGl0ZW06IFQpID0+IHZvaWQpID0+IElEaXNwb3NhYmxlLCB0aGlzQ29udGV4dDogYW55KSB7XHJcbiAgICBtZXRob2QgPSBfLmJpbmQobWV0aG9kLCB0aGlzQ29udGV4dCk7XHJcbiAgICByZXR1cm4gY3JlYXRlT2JzZXJ2YWJsZTxUPihvYnNlcnZlciA9PiB7XHJcbiAgICAgICAgY29uc3QgZGlzcG9zYWJsZSA9IG1ldGhvZCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4gZGlzcG9zYWJsZS5kaXNwb3NlKCk7XHJcbiAgICB9KTtcclxufVxyXG4iXX0=