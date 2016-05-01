# chatwork-to-slack
[![npm version](https://img.shields.io/npm/v/chatwork-to-slack.svg?style=flat-square)](https://www.npmjs.com/package/chatwork-to-slack) [![Build Status](https://img.shields.io/travis/pine613/chatwork-to-slack/master.svg?style=flat-square)](https://travis-ci.org/pine613/chatwork-to-slack) [![Dependency Status](https://img.shields.io/david/pine613/chatwork-to-slack.svg?style=flat-square)](https://david-dm.org/pine613/chatwork-to-slack) [![devDependency Status](https://img.shields.io/david/dev/pine613/chatwork-to-slack.svg?style=flat-square)](https://david-dm.org/pine613/chatwork-to-slack#info=devDependencies) [![MIT](https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square)](http://opensource.org/licenses/MIT)

> Transfer chat messages from ChatWork to Slack

**EXPERIMENTAL**

## Why ???
- ChatWork is not user friendly (especially for engineers)
- I don't wish to launch many chat tools
- I want to read chat message only from Slack

## Getting started
`chatwork-to-slack` requires Node v6.0.0 or later.

```
$ node -v
6.0.0

$ npm i -g chatwork-to-slack
```

To start `chatwork-to-slack`, you need to install and launch MongoDB.

```
$ chatwork-to-slack \
   --chatwork-room-id=12345 \
   --chatwork-api-token=YOUR_CHATWORK_API_TOKEN \
   --slack-webhook-url=YOUR_SLACK_WEBHOOK_URL \
   --slack-channel=CHANNEL_NAME \
   --mongodb-url=mongodb://localhost/chatwork
```

The command is not deamonized.
You can use `chatwork-to-slack` along with Cron.

## Example
- [Emilia](https://github.com/pine613/Emilia) (example on OpenShift)

## See also
- [チャットワークAPIを限定プレビュー公開します！](http://blog-ja.chatwork.com/2013/11/api-preview.html) (Japanese)
- [チャットワークAPIドキュメント](http://developer.chatwork.com/ja/index.html) (Japanese)

## License
MIT License
