fetch("https://hif-dliq.deepseek.com/query", {
  "headers": {
    "accept": "*/*",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"hifRequestError\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"HIF请求失败: https://hif-dliq.deepseek.com/query\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_errorType\\\":\\\"network\\\",\\\"ds_statusCode\\\":\\\"null\\\",\\\"ds_bizCode\\\":\\\"null\\\",\\\"ds_responseCode\\\":\\\"null\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/d10d857a-0f98-4b83-b0ce-9dc8b38abcb2\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996691}\",\"local_time_ms\":1778863462164,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"__httpResponse\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"httpResponse GET https://hif-dliq.deepseek.com/query, 5ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_method\\\":\\\"GET\\\",\\\"ds_duration\\\":5,\\\"ds_metricDuration\\\":5,\\\"ds_path\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_status\\\":\\\"-1\\\",\\\"ds_logId\\\":\\\"[unset]\\\",\\\"ds_errorType\\\":\\\"client\\\",\\\"ds_code\\\":\\\"none\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/d10d857a-0f98-4b83-b0ce-9dc8b38abcb2\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996690}\",\"local_time_ms\":1778863462162,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863462,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"__tti\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"/ TTI 上报：22ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_type\\\":\\\"warmStart\\\",\\\"ds_referer\\\":\\\"https://www.google.com/\\\",\\\"ds_metricDuration\\\":22,\\\"ds_metricVisitIndex\\\":0,\\\"ds_metricDurationSinceMounted\\\":0,\\\"ds_hasError\\\":\\\"false\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996696}\",\"local_time_ms\":1778863463104,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"__pageVisit\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"访问页面 [/] [0]：22ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_pathname\\\":\\\"/\\\",\\\"ds_metricVisitIndex\\\":0,\\\"ds_metricDuration\\\":22,\\\"ds_referrer\\\":\\\"https://www.google.com/\\\",\\\"ds_appTheme\\\":\\\"system\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996695}\",\"local_time_ms\":1778863463104,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"modelSwitchExpose\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"模型切换器曝光\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_modelTypes\\\":\\\"default,expert\\\",\\\"ds_exposeCount\\\":1,\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_model_types\\\":\\\"[\\\\\\\"default\\\\\\\",\\\\\\\"expert\\\\\\\"]\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996694}\",\"local_time_ms\":1778863463102,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"routeChange\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"路由改变 => /\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_to\\\":\\\"/\\\",\\\"ds_redirect\\\":\\\"false\\\",\\\"ds_redirected\\\":\\\"false\\\",\\\"ds_redirectReason\\\":\\\"\\\",\\\"ds_redirectTo\\\":\\\"/\\\",\\\"ds_hasToken\\\":\\\"true\\\",\\\"ds_hasUserInfo\\\":\\\"true\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996693}\",\"local_time_ms\":1778863463083,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"createSessionClicked\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"点击了开启新对话按钮\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_position\\\":\\\"top\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/d10d857a-0f98-4b83-b0ce-9dc8b38abcb2\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996692}\",\"local_time_ms\":1778863463076,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863463,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://hif-dliq.deepseek.com/query", {
  "headers": {
    "accept": "*/*",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"hifRequestError\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"HIF请求失败: https://hif-dliq.deepseek.com/query\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_errorType\\\":\\\"network\\\",\\\"ds_statusCode\\\":\\\"null\\\",\\\"ds_bizCode\\\":\\\"null\\\",\\\"ds_responseCode\\\":\\\"null\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996698}\",\"local_time_ms\":1778863470172,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"__httpResponse\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"httpResponse GET https://hif-dliq.deepseek.com/query, 5ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_method\\\":\\\"GET\\\",\\\"ds_duration\\\":5,\\\"ds_metricDuration\\\":5,\\\"ds_path\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_status\\\":\\\"-1\\\",\\\"ds_logId\\\":\\\"[unset]\\\",\\\"ds_errorType\\\":\\\"client\\\",\\\"ds_code\\\":\\\"none\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996697}\",\"local_time_ms\":1778863470171,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863470,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://chat.deepseek.com/api/v0/chat/completion", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0",
    "x-ds-pow-response": "eyJhbGdvcml0aG0iOiJEZWVwU2Vla0hhc2hWMSIsImNoYWxsZW5nZSI6IjcwYzg0MWYwNGZmN2RlOGRlZmNiOTk1YTU2NmZkMGZlZmZlOTkyZTdmMWU5MDQ3Mzg0NjExM2ZhY2U5MWYxNjgiLCJzYWx0IjoiYTk4NjQ3OWQ3NmM0ODZhNmJlYzMiLCJhbnN3ZXIiOjk0OTc1LCJzaWduYXR1cmUiOiI3YzA4YjU0OTEyYjU3MGM4ZGRjZjY4ODQyODQ4NmU3YjFkYTliMTlhNjk4OWUzOWJkMTQzNGJlM2M3ZjA0ZThlIiwidGFyZ2V0X3BhdGgiOiIvYXBpL3YwL2NoYXQvY29tcGxldGlvbiJ9",
    "x-hif-leim": "rU+nq07b5HNM75MsrQ9Ksac1Mp5ddvCLJMmgiD3AvXCetZa7LBLUydU=.KveEZlM0vq9fwke9"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "{\"chat_session_id\":\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\",\"parent_message_id\":null,\"model_type\":\"default\",\"prompt\":\"hi\",\"ref_file_ids\":[],\"thinking_enabled\":false,\"search_enabled\":true,\"preempt\":false}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://chat.deepseek.com/api/v0/chat_session/create", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "{}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"preCreateSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"开始预创建 session\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996709}\",\"local_time_ms\":1778863480255,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"chatCompletionApi\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"chatCompletionApi 被调用\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_scene\\\":\\\"completion\\\",\\\"ds_chatSessionId\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_modelType\\\":\\\"default\\\",\\\"ds_withFile\\\":\\\"false\\\",\\\"ds_fileExtensions\\\":\\\"[]\\\",\\\"ds_thinkingEnabled\\\":\\\"false\\\",\\\"ds_messageId\\\":\\\"\\\",\\\"ds_challengeResponse\\\":\\\"true\\\",\\\"ds_searchEnabled\\\":\\\"true\\\",\\\"ds_promptLength\\\":2,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996708}\",\"local_time_ms\":1778863480245,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"retrievePowAnswer\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"获取工作量证明: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_expireInfo\\\":\\\"valid\\\",\\\"ds_expireAt\\\":1778863755265,\\\"ds_scene\\\":\\\"completion_like\\\",\\\"ds_answer\\\":94975,\\\"ds_expireAfter\\\":300000,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996707}\",\"local_time_ms\":1778863480242,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powCleared\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"工作量证明清除: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_scene\\\":\\\"completion_like\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996706}\",\"local_time_ms\":1778863480242,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"__tti\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07 TTI 上报：14ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_type\\\":\\\"warmStart\\\",\\\"ds_referer\\\":\\\"https://www.google.com/\\\",\\\"ds_metricDuration\\\":14,\\\"ds_metricVisitIndex\\\":0,\\\"ds_metricDurationSinceMounted\\\":1,\\\"ds_hasError\\\":\\\"false\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996705}\",\"local_time_ms\":1778863480238,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"__pageVisit\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"访问页面 [/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07] [0]：13ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_pathname\\\":\\\"/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_metricVisitIndex\\\":0,\\\"ds_metricDuration\\\":13,\\\"ds_referrer\\\":\\\"https://www.google.com/\\\",\\\"ds_appTheme\\\":\\\"system\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996704}\",\"local_time_ms\":1778863480238,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"routeChange\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"路由改变 => /a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_to\\\":\\\"/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_redirect\\\":\\\"false\\\",\\\"ds_redirected\\\":\\\"false\\\",\\\"ds_redirectReason\\\":\\\"\\\",\\\"ds_redirectTo\\\":\\\"/\\\",\\\"ds_hasToken\\\":\\\"true\\\",\\\"ds_hasUserInfo\\\":\\\"true\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996703}\",\"local_time_ms\":1778863480225,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"createSessionAndStartCompletion\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"创建会话并开始补全\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_agentId\\\":\\\"chat\\\",\\\"ds_newSessionId\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_oldSessionId\\\":\\\"null\\\",\\\"ds_isCreateNewChat\\\":\\\"false\\\",\\\"ds_thinkingEnabled\\\":\\\"false\\\",\\\"ds_searchEnabled\\\":\\\"true\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996702}\",\"local_time_ms\":1778863480222,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"createSessionFromPreCreate\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"使用预创建的 session\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_agentId\\\":\\\"chat\\\",\\\"ds_sessionId\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996701}\",\"local_time_ms\":1778863480215,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"createSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"开始创建对话\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_agentId\\\":\\\"chat\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996700}\",\"local_time_ms\":1778863480214,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"send_button_click\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"发送按钮点击\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_chat_session_id\\\":\\\"\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_is_send_button_new_chat\\\":1,\\\"ds_prompt_length\\\":2,\\\"ds_is_think_enable\\\":0,\\\"ds_is_search_enable\\\":1,\\\"ds_is_edit_mode\\\":0,\\\"ds_file_count\\\":0,\\\"ds_file_extensions\\\":\\\"[]\\\",\\\"ds_file_sources\\\":\\\"[]\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996699}\",\"local_time_ms\":1778863480210,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863480,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"preCreateSessionSuccess\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"预创建 session 成功\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_sessionId\\\":\\\"73a26e19-4ea6-4031-9b38-5399953c03aa\\\",\\\"ds_ttlSeconds\\\":259200,\\\"ds_expiresAt\\\":1779122680411,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996712}\",\"local_time_ms\":1778863480411,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetReady\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE ready事件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_chat_message_id\\\":1,\\\"ds_parent_message_id\\\":\\\"null\\\",\\\"ds_full_chat_message_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07:1\\\",\\\"ds_full_parent_message_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07:null\\\",\\\"ds_chat_message_role\\\":\\\"user\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996711}\",\"local_time_ms\":1778863480400,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSEConnected\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE建立连接\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":154,\\\"ds_logId\\\":\\\"7197bb244c5fe2c8fa3c9457aab8dd25\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996710}\",\"local_time_ms\":1778863480399,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863480,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"newSessionSentCompletion\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"创建session后第一条消息发送成功\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_sessionId\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996714}\",\"local_time_ms\":1778863480778,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetUpdateSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"更新session信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_updatedAt\\\":1778863480825.114,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996713}\",\"local_time_ms\":1778863480774,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863480,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetStreamDispose\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE请求终止\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_isHeaderReceived\\\":\\\"true\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996719}\",\"local_time_ms\":1778863481288,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"clientStreamNetworkMonitor\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"流式请求信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_streamErrorStage\\\":\\\"null\\\",\\\"ds_streamScenario\\\":\\\"completion\\\",\\\"ds_logId\\\":\\\"7197bb244c5fe2c8fa3c9457aab8dd25\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996718}\",\"local_time_ms\":1778863481287,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetClose\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE close事件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996717}\",\"local_time_ms\":1778863481286,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetTitle\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE title事件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_title\\\":\\\"Greeting Assistance\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996716}\",\"local_time_ms\":1778863481286,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetUpdateSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"更新session信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_updatedAt\\\":1778863481326.763,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996715}\",\"local_time_ms\":1778863481277,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863481,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"thinkingSwitchToggled\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"点击了深度思考开关\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_enabled\\\":\\\"true\\\",\\\"ds_fileEmpty\\\":\\\"true\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996720}\",\"local_time_ms\":1778863484391,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863484,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://chat.deepseek.com/api/v0/chat/create_pow_challenge", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "{\"target_path\":\"/api/v0/chat/completion\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"preparePowChallengeAndSolve\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"准备工作量证明并解决: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_source\\\":\\\"prepare\\\",\\\"ds_scene\\\":\\\"completion_like\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996721}\",\"local_time_ms\":1778863485976,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863486,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"powSolveChallengeStart\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"Start solving challenge\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996722}\",\"local_time_ms\":1778863486130,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863486,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://hif-dliq.deepseek.com/query", {
  "headers": {
    "accept": "*/*",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://fe-static.deepseek.com/chat/static/sha3_wasm_bg.7b9ca65ddd.wasm", {
  "referrer": "",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"hifRequestError\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"HIF请求失败: https://hif-dliq.deepseek.com/query\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_errorType\\\":\\\"network\\\",\\\"ds_statusCode\\\":\\\"null\\\",\\\"ds_bizCode\\\":\\\"null\\\",\\\"ds_responseCode\\\":\\\"null\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996724}\",\"local_time_ms\":1778863486176,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"__httpResponse\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"httpResponse GET https://hif-dliq.deepseek.com/query, 1ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_method\\\":\\\"GET\\\",\\\"ds_duration\\\":1,\\\"ds_metricDuration\\\":1,\\\"ds_path\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_status\\\":\\\"-1\\\",\\\"ds_logId\\\":\\\"[unset]\\\",\\\"ds_errorType\\\":\\\"client\\\",\\\"ds_code\\\":\\\"none\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996723}\",\"local_time_ms\":1778863486176,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863486,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"powPrepared\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"工作量证明准备完成: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":173,\\\"ds_difficulty\\\":144000,\\\"ds_answer\\\":35059,\\\"ds_scene\\\":\\\"completion_like\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996726}\",\"local_time_ms\":1778863486304,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powSolveChallengeSuccess\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"Solved challenge\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":173.89999961853027,\\\"ds_from\\\":\\\"normal\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996725}\",\"local_time_ms\":1778863486304,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863486,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://chat.deepseek.com/api/v0/chat/completion", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0",
    "x-ds-pow-response": "eyJhbGdvcml0aG0iOiJEZWVwU2Vla0hhc2hWMSIsImNoYWxsZW5nZSI6IjJjZTQ2MzEyY2I1NDhhNDdiNmEwODQwMTBkNzIyMjM0ZTZmNWI1NTdhM2YwY2M1OGZkYTFmNWIwZjI0OGE2MDEiLCJzYWx0IjoiNGM3OGY3YWU1NzlhNzU5MWI2NDIiLCJhbnN3ZXIiOjM1MDU5LCJzaWduYXR1cmUiOiIyOWJlYzA5NzU5NWI1MDk5YTc0N2NmNjgwZTAxMmZiOWMwYTdkZmQ4ODdjZmE3NTM5YjIxMGEzMWVlNjk3N2RhIiwidGFyZ2V0X3BhdGgiOiIvYXBpL3YwL2NoYXQvY29tcGxldGlvbiJ9",
    "x-hif-leim": "rU+nq07b5HNM75MsrQ9Ksac1Mp5ddvCLJMmgiD3AvXCetZa7LBLUydU=.KveEZlM0vq9fwke9"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "{\"chat_session_id\":\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\",\"parent_message_id\":2,\"model_type\":null,\"prompt\":\"hi\",\"ref_file_ids\":[],\"thinking_enabled\":true,\"search_enabled\":true,\"preempt\":false}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"chatCompletionApi\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"chatCompletionApi 被调用\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_scene\\\":\\\"completion\\\",\\\"ds_chatSessionId\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_modelType\\\":\\\"\\\",\\\"ds_withFile\\\":\\\"false\\\",\\\"ds_fileExtensions\\\":\\\"[]\\\",\\\"ds_thinkingEnabled\\\":\\\"true\\\",\\\"ds_messageId\\\":\\\"\\\",\\\"ds_challengeResponse\\\":\\\"true\\\",\\\"ds_searchEnabled\\\":\\\"true\\\",\\\"ds_promptLength\\\":2,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996730}\",\"local_time_ms\":1778863488612,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"retrievePowAnswer\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"获取工作量证明: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_expireInfo\\\":\\\"valid\\\",\\\"ds_expireAt\\\":1778863786179,\\\"ds_scene\\\":\\\"completion_like\\\",\\\"ds_answer\\\":35059,\\\"ds_expireAfter\\\":300000,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996729}\",\"local_time_ms\":1778863488599,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powCleared\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"工作量证明清除: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_scene\\\":\\\"completion_like\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996728}\",\"local_time_ms\":1778863488599,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"send_button_click\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"发送按钮点击\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_is_send_button_new_chat\\\":0,\\\"ds_prompt_length\\\":2,\\\"ds_is_think_enable\\\":1,\\\"ds_is_search_enable\\\":1,\\\"ds_is_edit_mode\\\":0,\\\"ds_file_count\\\":0,\\\"ds_file_extensions\\\":\\\"[]\\\",\\\"ds_file_sources\\\":\\\"[]\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996727}\",\"local_time_ms\":1778863488597,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863488,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetReady\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE ready事件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_chat_message_id\\\":3,\\\"ds_parent_message_id\\\":2,\\\"ds_full_chat_message_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07:3\\\",\\\"ds_full_parent_message_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07:2\\\",\\\"ds_chat_message_role\\\":\\\"user\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996732}\",\"local_time_ms\":1778863488783,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSEConnected\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE建立连接\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":170,\\\"ds_logId\\\":\\\"6695a6dbeee1f6f3667f23a7a9e4e869\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996731}\",\"local_time_ms\":1778863488783,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863488,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetUpdateSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"更新session信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_updatedAt\\\":1778863489482.0098,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996733}\",\"local_time_ms\":1778863489431,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863489,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"upload_action_click\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"附件上传按钮点击\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996734}\",\"local_time_ms\":1778863490372,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863490,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetClose\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE close事件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996736}\",\"local_time_ms\":1778863491068,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetUpdateSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"更新session信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_updatedAt\\\":1778863491093.3828,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996735}\",\"local_time_ms\":1778863491067,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863491,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetStreamDispose\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE请求终止\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_isHeaderReceived\\\":\\\"true\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996738}\",\"local_time_ms\":1778863492019,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"clientStreamNetworkMonitor\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"流式请求信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_streamErrorStage\\\":\\\"null\\\",\\\"ds_streamScenario\\\":\\\"completion\\\",\\\"ds_logId\\\":\\\"6695a6dbeee1f6f3667f23a7a9e4e869\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996737}\",\"local_time_ms\":1778863492018,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863492,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://chat.deepseek.com/api/v0/file/upload_file", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryDWveX5LNJADpoRm2",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0",
    "x-ds-pow-response": "eyJhbGdvcml0aG0iOiJEZWVwU2Vla0hhc2hWMSIsImNoYWxsZW5nZSI6IjQzNzY5Yjg4NmNhMjUyNDM4MzBkNTFlNmJlNGJhODQ3YTA1MGM3MzE3ZDM0NDU1MmVmNzM5Yjc3YmM0NGFhYmEiLCJzYWx0IjoiNDQ0YzIwMWQzYzE4YTM5YjI5MDIiLCJhbnN3ZXIiOjgyNDg4LCJzaWduYXR1cmUiOiJmZDFlZGMxYjZmZmZlYzRmZDgyZDcyYWI5N2UwYTlkNWNmNTY3NmFiNTQzZTEzNTNhYjAyZjc4MzU5MDAxODQxIiwidGFyZ2V0X3BhdGgiOiIvYXBpL3YwL2ZpbGUvdXBsb2FkX2ZpbGUifQ==",
    "x-file-size": "4328",
    "x-model-type": "default",
    "x-thinking-enabled": "1"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "------WebKitFormBoundaryDWveX5LNJADpoRm2\r\nContent-Disposition: form-data; name=\"file\"; filename=\"digital-ebook-maker-architecture.md\"\r\nContent-Type: text/markdown\r\n\r\n\r\n------WebKitFormBoundaryDWveX5LNJADpoRm2--\r\n",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://chat.deepseek.com/api/v0/chat/create_pow_challenge", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "{\"target_path\":\"/api/v0/chat/completion\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"preparePowChallengeAndSolve\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"准备工作量证明并解决: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_source\\\":\\\"prepare\\\",\\\"ds_scene\\\":\\\"completion_like\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996743}\",\"local_time_ms\":1778863512113,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"retrievePowAnswer\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"获取工作量证明: upload_file\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_expireInfo\\\":\\\"valid\\\",\\\"ds_expireAt\\\":1778863758343,\\\"ds_scene\\\":\\\"upload_file\\\",\\\"ds_answer\\\":82488,\\\"ds_expireAfter\\\":300000,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996742}\",\"local_time_ms\":1778863512097,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powCleared\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"工作量证明清除: upload_file\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_scene\\\":\\\"upload_file\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996741}\",\"local_time_ms\":1778863512097,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"uploadFile\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"选取并开始上传文件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_fileName\\\":\\\"digital-ebook-maker-architecture.md\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996740}\",\"local_time_ms\":1778863512096,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"file_upload\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"文件上传操作\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_file_source\\\":\\\"file_picker\\\",\\\"ds_file_count\\\":1,\\\"ds_is_success\\\":1,\\\"ds_error_reason\\\":\\\"\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996739}\",\"local_time_ms\":1778863512089,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863512,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"file_upload_result\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"文件上传结果\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_file_id\\\":\\\"file-2f175490-384f-463b-a211-72e74a498ac9\\\",\\\"ds_file_extension\\\":\\\"md\\\",\\\"ds_file_size\\\":4328,\\\"ds_is_success\\\":1,\\\"ds_error_reason\\\":\\\"\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_file_source\\\":\\\"file_picker\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_time_elapsed\\\":207,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996745}\",\"local_time_ms\":1778863512303,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"uploadFileSuccess\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"文件上传成功\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_fileName\\\":\\\"digital-ebook-maker-architecture.md\\\",\\\"ds_fileId\\\":\\\"file-2f175490-384f-463b-a211-72e74a498ac9\\\",\\\"ds_status\\\":\\\"PENDING\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996744}\",\"local_time_ms\":1778863512303,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863512,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"powSolveChallengeStart\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"Start solving challenge\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996746}\",\"local_time_ms\":1778863512680,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863512,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://fe-static.deepseek.com/chat/static/sha3_wasm_bg.7b9ca65ddd.wasm", {
  "referrer": "",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://chat.deepseek.com/api/v0/chat/create_pow_challenge", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "{\"target_path\":\"/api/v0/file/upload_file\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"preparePowChallengeAndSolve\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"准备工作量证明并解决: upload_file\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_source\\\":\\\"prepare\\\",\\\"ds_scene\\\":\\\"upload_file\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996749}\",\"local_time_ms\":1778863512933,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powPrepared\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"工作量证明准备完成: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":252.7999997138977,\\\"ds_difficulty\\\":144000,\\\"ds_answer\\\":89909,\\\"ds_scene\\\":\\\"completion_like\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996748}\",\"local_time_ms\":1778863512933,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powSolveChallengeSuccess\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"Solved challenge\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":253.19999980926514,\\\"ds_from\\\":\\\"normal\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996747}\",\"local_time_ms\":1778863512933,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863512,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"powSolveChallengeStart\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"Start solving challenge\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996750}\",\"local_time_ms\":1778863513095,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863513,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://fe-static.deepseek.com/chat/static/sha3_wasm_bg.7b9ca65ddd.wasm", {
  "referrer": "",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"powPrepared\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"工作量证明准备完成: upload_file\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":228.30000019073486,\\\"ds_difficulty\\\":144000,\\\"ds_answer\\\":79648,\\\"ds_scene\\\":\\\"upload_file\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996752}\",\"local_time_ms\":1778863513324,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powSolveChallengeSuccess\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"Solved challenge\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":228.90000009536743,\\\"ds_from\\\":\\\"normal\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996751}\",\"local_time_ms\":1778863513324,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863513,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"predefine_page_alive\",\"params\":\"{\\\"url_path\\\":\\\"/a/chat/s/d10d857a-0f98-4b83-b0ce-9dc8b38abcb2\\\",\\\"title\\\":\\\"DeepSeek\\\",\\\"url\\\":\\\"https://chat.deepseek.com/a/chat/s/d10d857a-0f98-4b83-b0ce-9dc8b38abcb2\\\",\\\"duration\\\":60000,\\\"is_support_visibility_change\\\":1,\\\"startTime\\\":1778863454742,\\\"hidden\\\":\\\"visible\\\",\\\"leave\\\":false,\\\"event_index\\\":1778863996753}\",\"local_time_ms\":1778863514743,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863514,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://chat.deepseek.com/api/v0/file/fetch_files?file_ids=file-2f175490-384f-463b-a211-72e74a498ac9", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"fetchFilesInfo\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"获取文件信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_fileIds\\\":\\\"file-2f175490-384f-463b-a211-72e74a498ac9\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996754}\",\"local_time_ms\":1778863514775,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863514,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"file_parse_result\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"文件解析结果\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_file_id\\\":\\\"file-2f175490-384f-463b-a211-72e74a498ac9\\\",\\\"ds_file_extension\\\":\\\"md\\\",\\\"ds_file_size\\\":4328,\\\"ds_is_success\\\":1,\\\"ds_time_elapsed\\\":2845,\\\"ds_error_reason\\\":\\\"\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_file_source\\\":\\\"file_picker\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_token_usage\\\":1090,\\\"ds_audit_result\\\":\\\"\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996756}\",\"local_time_ms\":1778863514941,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"parseFileSuccess\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"解析文件成功\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_fileId\\\":\\\"file-2f175490-384f-463b-a211-72e74a498ac9\\\",\\\"ds_file_name\\\":\\\"digital-ebook-maker-architecture.md\\\",\\\"ds_status\\\":\\\"SUCCESS\\\",\\\"ds_error_code\\\":\\\"null\\\",\\\"ds_stage\\\":\\\"parse\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996755}\",\"local_time_ms\":1778863514941,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863514,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://chat.deepseek.com/api/v0/chat/completion", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer qFcfbN5htKaiLj3mwBRxOc+fdTrNTMlLgUQbuBeomR6j1uulIlRTa4PrUIQ6e3PQ",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0",
    "x-ds-pow-response": "eyJhbGdvcml0aG0iOiJEZWVwU2Vla0hhc2hWMSIsImNoYWxsZW5nZSI6IjZiYmQ4MGU3YWJiMzdhMTU3NDJkNmM4Y2Y1ODY1M2FlMzE2MDVkMGRjYTA3YjVkYjVkN2ViNjVlNWM3NzEwZDMiLCJzYWx0IjoiY2RmZDA0ZDc2NzkyOWE2YWU2NmYiLCJhbnN3ZXIiOjg5OTA5LCJzaWduYXR1cmUiOiJhNjdlYzc4YjBmYjAzYjlmMjdhZDI2YzhlZWEwNWI2YTAzOWI1MGZiYWMzOTkzMzYzYzY2MDc4NzRlYjQwMzc2IiwidGFyZ2V0X3BhdGgiOiIvYXBpL3YwL2NoYXQvY29tcGxldGlvbiJ9",
    "x-hif-leim": "rU+nq07b5HNM75MsrQ9Ksac1Mp5ddvCLJMmgiD3AvXCetZa7LBLUydU=.KveEZlM0vq9fwke9"
  },
  "referrer": "https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07",
  "body": "{\"chat_session_id\":\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\",\"parent_message_id\":4,\"model_type\":null,\"prompt\":\"ai\",\"ref_file_ids\":[\"file-2f175490-384f-463b-a211-72e74a498ac9\"],\"thinking_enabled\":true,\"search_enabled\":true,\"preempt\":false}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"chatCompletionApi\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"chatCompletionApi 被调用\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_scene\\\":\\\"completion\\\",\\\"ds_chatSessionId\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_modelType\\\":\\\"\\\",\\\"ds_withFile\\\":\\\"true\\\",\\\"ds_fileExtensions\\\":\\\"[\\\\\\\"md\\\\\\\"]\\\",\\\"ds_thinkingEnabled\\\":\\\"true\\\",\\\"ds_messageId\\\":\\\"\\\",\\\"ds_challengeResponse\\\":\\\"true\\\",\\\"ds_searchEnabled\\\":\\\"true\\\",\\\"ds_promptLength\\\":2,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996760}\",\"local_time_ms\":1778863516539,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"retrievePowAnswer\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"获取工作量证明: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_expireInfo\\\":\\\"valid\\\",\\\"ds_expireAt\\\":1778863812663,\\\"ds_scene\\\":\\\"completion_like\\\",\\\"ds_answer\\\":89909,\\\"ds_expireAfter\\\":300000,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996759}\",\"local_time_ms\":1778863516517,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"powCleared\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"工作量证明清除: completion_like\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_scene\\\":\\\"completion_like\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996758}\",\"local_time_ms\":1778863516516,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"send_button_click\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"发送按钮点击\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_is_send_button_new_chat\\\":0,\\\"ds_prompt_length\\\":2,\\\"ds_is_think_enable\\\":1,\\\"ds_is_search_enable\\\":1,\\\"ds_is_edit_mode\\\":0,\\\"ds_file_count\\\":1,\\\"ds_file_extensions\\\":\\\"[\\\\\\\"md\\\\\\\"]\\\",\\\"ds_file_sources\\\":\\\"[\\\\\\\"file_picker\\\\\\\"]\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996757}\",\"local_time_ms\":1778863516510,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863516,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetReady\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE ready事件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_model_type\\\":\\\"default\\\",\\\"ds_chat_session_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"ds_chat_message_id\\\":5,\\\"ds_parent_message_id\\\":4,\\\"ds_full_chat_message_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07:5\\\",\\\"ds_full_parent_message_id\\\":\\\"dfcb7b07-a6a5-48ed-8c46-c891e532ea07:4\\\",\\\"ds_chat_message_role\\\":\\\"user\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996762}\",\"local_time_ms\":1778863516850,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSEConnected\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE建立连接\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_duration\\\":311,\\\"ds_logId\\\":\\\"5a1cbd55ee94819774bf3722bf31d543\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996761}\",\"local_time_ms\":1778863516850,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863516,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetUpdateSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"更新session信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_updatedAt\\\":1778863517310.657,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996763}\",\"local_time_ms\":1778863517259,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863517,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://hif-dliq.deepseek.com/query", {
  "headers": {
    "accept": "*/*",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "x-app-version": "2.0.0",
    "x-client-locale": "en_US",
    "x-client-platform": "web",
    "x-client-timezone-offset": "25200",
    "x-client-version": "2.0.0"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"hifRequestError\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"HIF请求失败: https://hif-dliq.deepseek.com/query\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_errorType\\\":\\\"network\\\",\\\"ds_statusCode\\\":\\\"null\\\",\\\"ds_bizCode\\\":\\\"null\\\",\\\"ds_responseCode\\\":\\\"null\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996765}\",\"local_time_ms\":1778863518234,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"__httpResponse\",\"params\":\"{\\\"event_level\\\":\\\"error\\\",\\\"event_message\\\":\\\"httpResponse GET https://hif-dliq.deepseek.com/query, 57ms\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__error\\\":\\\"{\\\\\\\"name\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\",\\\\\\\"message\\\\\\\":\\\\\\\"Network error\\\\\\\",\\\\\\\"stack\\\\\\\":\\\\\\\"LylaError[NETWORK]\\\\\\\\n    at o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:35982)\\\\\\\\n    at onNetworkError (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:31771)\\\\\\\\n    at XMLHttpRequest.<anonymous> (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:38362)\\\\\\\\n    at c (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:29221)\\\\\\\\n    at async o (https://fe-static.deepseek.com/chat/static/default-vendors.b3428ecdc9.js:1:34999)\\\\\\\\n    at async oF (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1025910)\\\\\\\\n    at async oO.poll (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1023705)\\\\\\\\n    at async oO.start (https://fe-static.deepseek.com/chat/static/main.190cf1db56.js:1:1024978)\\\\\\\",\\\\\\\"error\\\\\\\":null,\\\\\\\"logId\\\\\\\":\\\\\\\"[unset]\\\\\\\",\\\\\\\"httpStatus\\\\\\\":\\\\\\\"-1\\\\\\\"}\\\",\\\"ds_url\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_method\\\":\\\"GET\\\",\\\"ds_duration\\\":57,\\\"ds_metricDuration\\\":57,\\\"ds_path\\\":\\\"https://hif-dliq.deepseek.com/query\\\",\\\"ds_status\\\":\\\"-1\\\",\\\"ds_logId\\\":\\\"[unset]\\\",\\\"ds_errorType\\\":\\\"client\\\",\\\"ds_code\\\":\\\"none\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996764}\",\"local_time_ms\":1778863518234,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863518,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}); ;
fetch("https://gator.volces.com/list", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json; charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://chat.deepseek.com/",
  "body": "[{\"events\":[{\"event\":\"SSENetStreamDispose\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE请求终止\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_isHeaderReceived\\\":\\\"true\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996769}\",\"local_time_ms\":1778863538559,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"clientStreamNetworkMonitor\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"流式请求信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_streamErrorStage\\\":\\\"null\\\",\\\"ds_streamScenario\\\":\\\"completion\\\",\\\"ds_logId\\\":\\\"5a1cbd55ee94819774bf3722bf31d543\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996768}\",\"local_time_ms\":1778863538559,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetClose\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"SSE close事件\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996767}\",\"local_time_ms\":1778863538557,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"},{\"event\":\"SSENetUpdateSession\",\"params\":\"{\\\"event_level\\\":\\\"info\\\",\\\"event_message\\\":\\\"更新session信息\\\",\\\"dsp__appVersion\\\":\\\"2.0.0\\\",\\\"dsp__commitId\\\":\\\"59344f68\\\",\\\"dsp__runtimeSessionId\\\":\\\"session_v0_i907as3ft0b\\\",\\\"ds_updatedAt\\\":1778863538607.7148,\\\"dsp__windowWidth\\\":912,\\\"dsp__windowHeight\\\":980,\\\"dsp__documentHidden\\\":\\\"false\\\",\\\"dsp__location\\\":\\\"https://chat.deepseek.com/a/chat/s/dfcb7b07-a6a5-48ed-8c46-c891e532ea07\\\",\\\"dsp__host\\\":\\\"chat.deepseek.com\\\",\\\"event_index\\\":1778863996766}\",\"local_time_ms\":1778863538556,\"is_bav\":0,\"session_id\":\"747922d7-ab2e-4950-9609-639c66d697d1\"}],\"user\":{\"user_unique_id\":\"a45fec9b-8f0c-45ba-918f-f6b65d2a3d69\",\"web_id\":\"7640160182885942543\"},\"header\":{\"app_id\":20006317,\"os_name\":\"mac\",\"os_version\":\"10_15_7\",\"device_model\":\"Macintosh\",\"language\":\"en-US\",\"platform\":\"web\",\"sdk_version\":\"5.2.11_tob\",\"sdk_lib\":\"js\",\"timezone\":7,\"tz_offset\":-25200,\"resolution\":\"1710x1107\",\"browser\":\"Chrome\",\"browser_version\":\"146.0.0.0\",\"referrer\":\"https://www.google.com/\",\"referrer_host\":\"www.google.com\",\"width\":1710,\"height\":1107,\"screen_width\":1710,\"screen_height\":1107,\"custom\":\"{\\\"$latest_referrer\\\":\\\"https://www.google.com/\\\",\\\"$latest_referrer_host\\\":\\\"www.google.com\\\",\\\"$latest_search_keyword\\\":\\\"\\\",\\\"commit_id\\\":\\\"59344f68\\\",\\\"commit_datetime\\\":\\\"2026/05/14 22:55:55\\\",\\\"origin_referrer\\\":\\\"https://www.google.com/\\\",\\\"origin_referrer_host\\\":\\\"www.google.com\\\"}\"},\"local_time\":1778863538,\"verbose\":1}]",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});
