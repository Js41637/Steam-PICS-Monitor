# Steam-PICS-Monitor
Monitors the Steam PICS for changelist updates and posts them to a slack channel

## Installation
#### Install the required package dependencies
```npm install```

## Usage
##### Dev Mode
```gulp start-dev```
##### Build and run
```gulp build``` and ```node index.js```
##### Running forever
You can use the `forever` npm module to run this bot  
in the background forever using the command:  
`npm run forever`

## Config File
Copy the `config.json.default` file and fill out the Slack API and Slack Channel fields and rename it config.json

## License
```
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * Js41637 wrote this. You can do whatever you want with this stuff.
 * If we meet some day, and you think this stuff is worth it,
 * you can buy me a ICED COFFEE in return.
 * ----------------------------------------------------------------------------
 */
 ```
