module.exports = {
    options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
    },
    livereload: {
        proxies: [
            {
                context: ['/admin', '/notice', '/profile', '/account', '/systemCheck'], host: '127.0.0.1',
                port: 8082
            }
        ],
        options: {
            open: true,
            middleware: function (connect) {
                console.log("<%= config.app %>");

                return [
                    require('grunt-connect-proxy/lib/utils').proxyRequest,
                    require('connect-modrewrite')(['!\\.html|\\.js|\\.ico|\\.svg|\\.css|\\.png|\\.gif|\\.jpg|\\.woff|\\.woff2|\\.ttf$ /index.html [L]']),
                    connect().use(
                        '/bower_components',
                        connect.static('./bower_components')
                    ),
                    connect.static("app"),
                    function (req, res, next) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Access-Control-Allow-Methods', '*');
                        next();
                    }
                ];
            }
        }
    },
    dist: {
        proxies: [
            {
                context: ['/api'],
                host: '127.0.0.1',
                port: 8082
            }
        ],
        options: {
            open: true,
            middleware: function (connect) {
                return [
                    require('grunt-connect-proxy/lib/utils').proxyRequest,
                    require('connect-modrewrite')(['!\\.html|\\.js|\\.ico|\\.svg|\\.css|\\.png|\\.gif|\\.jpg|\\.woff|\\.woff2|\\.ttf$ /index.html [L]']),
                    connect().use(
                        '/styles',
                        connect.static('./styles')
                    ),
                    connect().use(
                        '/scripts',
                        connect.static('./scripts')
                    ),
                    connect().use(
                        '/images',
                        connect.static('./images')
                    ),
                    connect.static("dist")
                ];
            }
        }
    }
};