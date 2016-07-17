import needle from 'needle'
import SteamUser from 'steam-user'
import _ from 'lodash'
import config from '../config.json'

if (config.slackToken == 'null' || config.slackChannel == 'null') {
  console.log("Error: slackToken or slackChannel are invalid")
  process.exit()
}

const client = new SteamUser(null, {
  enablePicsCache: true,
  changelistUpdateInterval: 50
})

client.logOn() // Log onto Steam anonymously

client.on('loggedOn', () => {
  console.log("Logged onto Steam as " + client.steamID.getSteam3RenderedID())
})

var lastChange
var list = []

client.on('changelist', (changeNumber, changeApps, changePackages) => {
  console.log("Change", changeNumber, lastChange)
  if (lastChange && lastChange == changeNumber) return
  lastChange = changeNumber

  client.getProductInfo(changeApps, changePackages, (apps, packages, unknownApps, unknownPackages) => {
    let out = [`*Changelist - <https://steamdb.info/changelist/${changeNumber}|${changeNumber}>* _(${changeApps.length} apps and ${changePackages.length} packages)_`]
    _.forEach(apps, app => {
      out.push(` - App: <https://steamdb.info/app/${app.appinfo.appid}|${app.appinfo.appid}> - ${app.appinfo.common ? (app.appinfo.common.name || 'Unknown') : 'Unknown App'}`)
    })
    _.forEach(packages, pack => {
      out.push(`- Package: <https://steamdb.info/sub/${pack.packageinfo.packageid}|${pack.packageinfo.packageid}> - Steam Sub ${pack.packageinfo.packageid}`)
    })
    if (unknownApps.length || unknownPackages.length) {
      out.push(`${unknownApps.length} Unknown Apps and ${unknownPackages.length} Unknown Packages`)
    }
    _.defer(() => {
      list.push(out.join('\n'))
    })
  })
})

const loop = () => {
  _.delay(() => {
    if (list.length) {
      console.log("Posting list")
      postMessage(list.join('\n'))
      list = []
    }
    loop()
  }, 18000)
}

const postMessage = message => {
  needle.post('https://slack.com/api/chat.postMessage', {
    token: config.slackToken,
    channel: config.slackChannel,
    text: message,
    username: config.botName,
    unfurl_links: false,
    icon_url: config.botAvatar
  })
}

loop()
