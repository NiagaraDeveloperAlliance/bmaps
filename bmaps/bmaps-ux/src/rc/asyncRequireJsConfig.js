function config(require, modulePrefix, isWebDevJs) {
    // https://www.niagara-community.com/_ui/core/chatter/groups/GroupProfilePage?g=0F9D0000000Py2r&fId=0D54G00006DxGDA
    // workaround to allow cross-site iframe
    require.config.baja.disableConnectionReuse = true;
    // configure async require plugin
    require.paths.async = modulePrefix + "bmaps/rc/async";
    // browser.console log level
    require.config['nmodule/js/rc/log/Log'] = require.config['nmodule/js/rc/log/Log'] || {};
    require.config['nmodule/js/rc/log/Log'].logLevels = {
        'browser.console': 'FINE',
        'bmaps': 'FINE'
    };
}
