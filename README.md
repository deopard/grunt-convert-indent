# grunt-convert-indent
Grunt task that converts tab/space indention of files in entire project.


## How to use
### Example code
```javascript
grunt.initConfig({
  convertindent: {
    YOUR_CUSTOM_TASK: {
      style: 'space',
      size: 2,
      backupDir: 'backup',
      src: [
        'directory/structure/will/be/remained/**/*.js'
      ]
    },
    YOUR_ANOTHER_CUSTOM_TASK: {
      style: 'tab',
      src: [
        'another/wildcard/**/*.css'
      ]
    }
  }
});
```

Run specific task.
```sh
grunt convertindent:YOUR_CUSTOM_TASK
```

Run all multi-tasks
```sh
grunt convertindent
```


## Parameters
### style
`space` or `tab`. Desired character to be used for indenting. Default is `space`.

### size
The size of spaces. Won't be used when style is `tab`. Default is `2`

### backupDir
Since this task will not create new converted files and modify existing files,
backup files are needed. The root path to copy backup files. All backup files will be remained in same
tree structure.
Default is `convert_backup`.
