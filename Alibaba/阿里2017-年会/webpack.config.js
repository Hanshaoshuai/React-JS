module.exports = function(config, webpack) {
    try {
        config.entry['vendor'] = [
            'axios',
            'classnames',
            'mobx',
            'mobx-react',
            'moment',
            'react-router-dom',
        ];

        Object.assign(config.externals, {
            "react": "window.React",
            "react-dom": "window.ReactDOM",
            "lodash": "window._"
        })

        config.resolve.extensions.push('.ts', '.tsx')

        return config;
    } catch (e) {
        console.error(e)
        throw e
    }
};
