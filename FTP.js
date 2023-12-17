module.exports = {
    access: {
        host: '31.31.196.163',
        user: 'u2324041_upload',
        password: 'cW6bL3cP5nwP2hX2',
    },
    localDirectory: '', //can be empty
    serverDirectory: '/www/ball.infinitycloud.ru', // Path to site root dir
    ignore: [ //FTP ignoring directories and files
        'node_modules',
        '.idea',
        '.gitignore',
        '.git',
        '.github',
        'FTP.js',
        'upload.js',
        '.htaccess'
    ],
    tasks:{ // tasks (upload selected directory)
        pub: 'public'
    }
};