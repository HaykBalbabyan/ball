module.exports = {
    access: {
        host: '',
        user: '',
        password: '',
    },
    localDirectory: '', //can be empty
    serverDirectory: '', // Path to site root dir
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
        pub: ''
    }
};