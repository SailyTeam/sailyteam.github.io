;window.CloudflareApps = window.Eager = window.CloudflareApps || window.Eager || {};
window.CloudflareApps = window.CloudflareApps || {};
CloudflareApps.siteId = "25ff0e73a05f83730d2c1d68cd5a73c2";
CloudflareApps.installs = CloudflareApps.installs || {};
;(function() {
    CloudflareApps.internal = CloudflareApps.internal || {};
    var errors = [];
    CloudflareApps.internal.placementErrors = errors;
    var errorHashes = {}
    var noteError = function(options) {
        var hash = options.selector + '::' + options.type + '::' + (options.installId || '');
        if (errorHashes[hash])
            return;
        errorHashes[hash] = true;
        errors.push(options);
    }
    var initializedSelectors = {};
    var currentInit = false;
    CloudflareApps.internal.markSelectors = function() {
        if (!currentInit) {
            check();
            currentInit = true;
            setTimeout(function() {
                currentInit = false;
            });
        }
    }
    var check = function() {
        var installs = window.CloudflareApps.installs;
        for (var installId in installs) {
            if (!installs.hasOwnProperty(installId))
                continue;
            var selectors = installs[installId].selectors;
            if (!selectors)
                continue;
            for (var key in selectors) {
                if (!selectors.hasOwnProperty(key))
                    continue;
                var hash = installId + "::" + key;
                if (initializedSelectors[hash])
                    continue;
                var els = document.querySelectorAll(selectors[key]);
                if (els && els.length > 1) {
                    noteError({
                        type: 'init:too-many',
                        option: key,
                        selector: selectors[key],
                        installId: installId
                    });
                    initializedSelectors[hash] = true;
                    continue;
                } else if (!els || !els.length) {
                    continue;
                }
                initializedSelectors[hash] = true;
                els[0].setAttribute('cfapps-selector', selectors[key]);
            }
        }
    }
    CloudflareApps.querySelector = function(selector) {
        if (selector === 'body' || selector === 'head') {
            return document[selector];
        }
        CloudflareApps.internal.markSelectors();
        var els = document.querySelectorAll('[cfapps-selector="' + selector + '"]');
        if (!els || !els.length) {
            noteError({
                type: 'select:not-found:by-attribute',
                selector: selector
            });
            els = document.querySelectorAll(selector);
            if (!els || !els.length) {
                noteError({
                    type: 'select:not-found:by-query',
                    selector: selector
                });
                return null;
            } else if (els.length > 1) {
                noteError({
                    type: 'select:too-many:by-query',
                    selector: selector
                });
            }
            return els[0];
        }
        if (els.length > 1) {
            noteError({
                type: 'select:too-many:by-attribute',
                selector: selector
            });
        }
        return els[0];
    }
}
)();
;(function() {
    var prevEls = {};
    CloudflareApps.createElement = function(options, prevEl) {
        CloudflareApps.internal.markSelectors();
        try {
            if (prevEl && prevEl.parentNode) {
                var replacedEl;
                if (prevEl.cfAppsElementId) {
                    replacedEl = prevEls[prevEl.cfAppsElementId];
                }
                if (replacedEl) {
                    prevEl.parentNode.replaceChild(replacedEl, prevEl);
                    delete prevEls[prevEl.cfAppsElementId];
                } else {
                    prevEl.parentNode.removeChild(prevEl);
                }
            }
            var element = document.createElement('cloudflare-app');
            var container;
            try {
                container = CloudflareApps.querySelector(options.selector);
            } catch (e) {}
            if (!container) {
                return element;
            }
            if (!container.parentNode && (options.method == "after" || options.method == "before" || options.method == "replace")) {
                return element;
            }
            if (container == document.body) {
                if (options.method == "after")
                    options.method = "append";
                else if (options.method == "before")
                    options.method = "prepend";
            }
            switch (options.method) {
            case "prepend":
                if (container.firstChild) {
                    container.insertBefore(element, container.firstChild);
                    break;
                }
            case "append":
                container.appendChild(element);
                break;
            case "after":
                if (container.nextSibling) {
                    container.parentNode.insertBefore(element, container.nextSibling);
                } else {
                    container.parentNode.appendChild(element);
                }
                break;
            case "before":
                container.parentNode.insertBefore(element, container);
                break;
            case "replace":
                try {
                    id = element.cfAppsElementId = Math.random().toString(36);
                    prevEls[id] = container;
                } catch (e) {}
                container.parentNode.replaceChild(element, container);
            }
            return element;
        } catch (e) {
            if (typeof console !== "undefined" && typeof console.error !== "undefined") {
                console.error("Error creating Cloudflare Apps element", e);
            }
        }
    }
}
)();
;(function() {
    CloudflareApps.matchPage = function(patterns) {
        if (!patterns || !patterns.length) {
            return true;
        }
        if (window.CloudflareApps && CloudflareApps.proxy && CloudflareApps.proxy.originalURL) {
            var url = CloudflareApps.proxy.originalURL.parsed;
            var loc = url.host + url.path;
        } else {
            var loc = document.location.host + document.location.pathname;
        }
        for (var i = 0; i < patterns.length; i++) {
            var re = new RegExp(patterns[i],'i');
            if (re.test(loc)) {
                return true;
            }
        }
        return false;
    }
}
)();
;CloudflareApps.installs["Qt879VeLolCf"] = {
    appId: "dvNRF2bh1fgh",
    scope: {}
};
;CloudflareApps.installs["Qt879VeLolCf"].options = {
    "theme": "slow"
};
(function() {
    var script = document.createElement('script');
    script.src = '/cdn-cgi/apps/body/4krSXH8NkPLwx6awm4R9klV587E.js';
    document.head.appendChild(script);
}
)();