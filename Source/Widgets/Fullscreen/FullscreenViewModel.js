/*global define*/
define(['../createCommand',
        '../../Core/Fullscreen',
        '../../ThirdParty/knockout'
        ], function(
            createCommand,
            Fullscreen,
            knockout) {
    "use strict";

    /**
     * The ViewModel for {@link FullscreenWidget}.
     * @alias FullscreenViewModel
     * @constructor
     *
     * @see FullscreenWidget
     */
    var FullscreenViewModel = function() {
        var that = this;

        var isFullscreen = knockout.observable(Fullscreen.isFullscreen());
        var isFullscreenEnabled = knockout.observable(Fullscreen.isFullscreenEnabled);

        /**
         * Indicates if fullscreen functionality is possible.
         * @type Observable
         */
        this.isFullscreenEnabled = isFullscreenEnabled;

        /**
         * Indicates if fullscreen functionality is currently toggled.
         * @type Observable
         */
        this.toggled = isFullscreen;

        /**
         * The command for toggling fullscreen mode.
         * @type Command
         */
        this.command = createCommand(function() {
            if (Fullscreen.isFullscreen()) {
                Fullscreen.exitFullscreen();
            } else {
                Fullscreen.requestFullscreen(that.fullscreenElement());
            }
        }, isFullscreenEnabled);

        /**
         * The current button tooltip.
         * @type Observable
         */
        this.tooltip = knockout.computed(function() {
            if (!isFullscreenEnabled()) {
                return 'Full screen unavailable';
            }
            return isFullscreen() ? 'Exit full screen' : 'Full screen';
        });

        /**
         * The HTML element to place into fullscreen mode when the
         * corresponding button is pressed.  By default, the entire page will
         * enter fullscreen. By specifying another container, only that
         * container will be in fullscreen.
         *
         * @type {Observable}
         */
        this.fullscreenElement = knockout.observable(document.body);

        document.addEventListener(Fullscreen.getFullscreenChangeEventName(), function() {
            isFullscreen(Fullscreen.isFullscreen());
        });
    };

    return FullscreenViewModel;
});
