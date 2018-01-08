# Hoikuen Tokyo JSON

日本の保育園データを収拾してJSONとして出力するためのプログラム群です。

## ゴール

* 東京の保育園のデータにJSONでアクセスできること

## 方針

* データ収集方法は原則としてスクレイピングのみ
  * **手作業によるデータの修正はしない**
  * これはなるべくメンテナンスフリーにするため
* 情報源は国または自治体が提供する一次データに限る

## Minimum Viable Product

* データは一旦このgithub repo上で、生JSONとして提供する
* 認証・認可などの識別はできなくてよい
* 自動的な更新などもとりあえず考えない

## Data Sources

### 2018年

* 施設等一覧 東京都福祉保健局 http://www.fukushihoken.metro.tokyo.jp/kiban/fukushi_shisetsu/shs_list/shisetsuitiran.html


## See Also

* 東京保育園マップ https://github.com/codefortokyo/tokyohoikuenmap
* 保育所の公式データは統一されたフォーマットで提供してほしい http://gfx.hatenablog.com/entry/2018/01/07/104348

## Project Owner

FUJI Goro (https://github.com/gfx)

## Copyright and License

Copyright 2018 https://github.com/hoikuen-tokyo

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


