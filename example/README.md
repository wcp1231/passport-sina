# Example

## config.js

```bash
$ cp config-sample.js config.js
```

`config.js` 的 `exports` 实际上是作为 `passport.use` 的参数，所以你直接写在 `passport.use` 的参数里也是可以的

```js
// 部分代码
new passport_sina({
    clientID: 'your app key here'
  , clientSecret: 'your app secret here'
  , callbackURL: 'your callback url here'
//  , requireState: false
//  , scope: ['statuses_to_me_read'
//          , 'follow_app_official_microblog']
},
function(accessToken, refreshToken, profile, callback) {
    process.nextTick(function () {
        return callback(null, profile);
    });
});
```

第一个参数主要包括 app key 、 app secret 、 回调 URL 、[scope](http://open.weibo.com/wiki/Scope)、等。在此处设置的值会覆盖 `passport-sina/lib/config.js` 中的值。

为了防止 CSRF 跨站，此插件强制进行 state 参数验证。

`requireState` 在此处设为 `false` 可以关闭 state 参数验证。

第二个参数是个 `verify` 函数，请参照 passport 文档。

## routes/auth.js

`state` 存储在 session 中，与 `callback` 返回的参数做比较。

