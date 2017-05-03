module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '.tmp',
                '<%= config.dist %>/{,*/}*',
                '!<%= config.dist %>/.git{,*/}*'
            ]
        }]
    },
    server: '.tmp',
    template: '<%= config.app %>/template.js'
};