class UrlQueryComponent {
    constructor(appName) {
        this.appName = appName;
        this.queryData = window.location.search.split('&');
    }

    get query() {
        return this.queryData;
    }

    // get mirrorUrl() {
    //     if
    //         }

    get defaultMirrorUrl() {
        let mirrors = {
            'king': 'http://kg.searchmirrors.com',
            'netgame': 'http://ng.searchmirrors.com',
            'vulkan': 'http://vo.searchmirrors.com',
            'reel': 'http://reelem.searchmirrors.com'
        };

        return mirrors[this.appName];
    }
}

let t = new UrlQueryComponent();
console.log(t.getQuery());