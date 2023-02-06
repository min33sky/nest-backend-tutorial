# 참고

Nest의 기본 빌드 옵션은 .ts 파일 외의 asset은 제외하도록 설정되어 있다.
.env 파일을 dist 디렉토리에 복사할 수 있도록 **nest-cli.json** 파일을 수정해야 한다.

```json
{
  "compilerOptions": {
    "assets": [
      {
        "include": "./config/env/*.env",
        "outDir": "./dist"
      }
    ]
  }
}
```
