
## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test` to run all tests

It is recommended to install a Jest vscode extension for
debugging and running test seperatly
For example Jest runner.

Sometimes the Jest cache gets corrupted. If you get strange errors that certains files cannot be found.
Clear the jest cache directory. The cache directory is configured in jest.config.

```javascript
cacheDirectory:'<rootDir>/dist/jest'
```
