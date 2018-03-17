module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
                'images/**/*.*',
                'scripts/**/*.*',
                'index.html'
            ]
        }, {
            expand: true,
            dot: true,
            cwd: 'static',
            dest: 'dist/static',
            src: [
                '**/*.*'
            ]
        }]
    }
};