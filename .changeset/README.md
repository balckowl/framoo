# Changesets

ユーザー向けの変更をリリースするときは、`npm run changeset` で変更内容とSemVerの更新幅を記録します。

- `patch`: バグ修正や互換性を保つ小さな修正
- `minor`: 互換性を保った機能追加
- `major`: 破壊的変更

リリース時は `npm run version-packages` でバージョンと`CHANGELOG.md`を更新し、内容を確認してから `npm run release` を実行します。
ユーザー向けリリースを伴わない開発設定や内部整理にはChangesetは不要です。
