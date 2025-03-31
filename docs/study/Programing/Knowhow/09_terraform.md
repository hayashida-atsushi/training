# 環境差異による terraform 差分の解消方法

## なぜ書いているか

PJ で変更がないにも関わらず、`terraform plan`実行時に余計な差分が発生してしまっていた。この差分の解消方法に関してメモしておくため。

## ログ

以下がログ

<details>
<summary>全文を表示</summary>

```
...差分多いので適当に省略
# data.aws_iam_policy_document.XXXXwill be read during apply
  # (depends on a resource or a module with changes pending)
 <= data "aws_iam_policy_document" "XXXX" {
      + id   = (known after apply)
      + json = (known after apply)

      + statement {
          + actions   = [
              + "s3:GetObject",
            ]
          + effect    = "Allow"
          + resources = [
              + "arn:aws:s3:::XXXX",
              + "arn:aws:s3:::XXXX/*",
            ]
          + sid       = "Allow CloudFront"

          + condition {
              + test     = "StringEquals"
              + values   = [
                  + "arn:aws:cloudfront::XXXXX",
                ]
              + variable = "aws:SourceArn"
            }

          + principals {
              + identifiers = [
                  + "cloudfront.amazonaws.com",
                ]
              + type        = "Service"
            }
        }
    }

# aws_cloudfront_distribution.XXXXX-cfd will be updated in-place

~ resource "aws_cloudfront_distribution" "XXXXXXX-cfd" {
id = "XXXXXXXX"
tags = {
"Name" = "XXXXXX-cfd"
"company" = "XXXX"
"environment_type" = "dev"
"project_name" = "XXXX XXXX"
"source_by" = "terraform"
} # (21 unchanged attributes hidden)

      ~ default_cache_behavior {
            # (12 unchanged attributes hidden)

          - lambda_function_association {
              - event_type   = "viewer-request" -> null
              - include_body = true -> null
              - lambda_arn   = "arn:aws:lambda:us-east-1:XXXXX" -> null
            }
          + lambda_function_association {
              + event_type   = "viewer-request"
              + include_body = true
              + lambda_arn   = (known after apply)
            }
        }

      ~ ordered_cache_behavior {
            # (13 unchanged attributes hidden)

          - lambda_function_association {
              - event_type   = "viewer-request" -> null
              - include_body = true -> null
              - lambda_arn   = "arn:aws:lambda:us-east-1:XXXXXX" -> null
            }
          + lambda_function_association {
              + event_type   = "viewer-request"
              + include_body = true
              + lambda_arn   = (known after apply)
            }
        }
      ~ ordered_cache_behavior {
            # (13 unchanged attributes hidden)

          - lambda_function_association {
              - event_type   = "viewer-request" -> null
              - include_body = true -> null
              - lambda_arn   = "arn:aws:lambda:us-east-1:XXXXX" -> null
            }
          + lambda_function_association {
              + event_type   = "viewer-request"
              + include_body = true
              + lambda_arn   = (known after apply)
            }
        }
      ~ ordered_cache_behavior {
            # (13 unchanged attributes hidden)

          - lambda_function_association {
              - event_type   = "viewer-request" -> null
              - include_body = true -> null
              - lambda_arn   = "arn:aws:lambda:us-east-1:XXXXX" -> null
            }
          + lambda_function_association {
              + event_type   = "viewer-request"
              + include_body = true
              + lambda_arn   = (known after apply)
            }
        }
      ~ ordered_cache_behavior {
            # (13 unchanged attributes hidden)

          - lambda_function_association {
              - event_type   = "viewer-request" -> null
              - include_body = true -> null
              - lambda_arn   = "arn:aws:lambda:us-east-1:XXXXXX" -> null
            }
          + lambda_function_association {
              + event_type   = "viewer-request"
              + include_body = true
              + lambda_arn   = (known after apply)
            }
        }
      ~ ordered_cache_behavior {
            # (13 unchanged attributes hidden)

          - lambda_function_association {
              - event_type   = "viewer-request" -> null
              - include_body = true -> null
              - lambda_arn   = "arn:aws:lambda:us-east-1:XXXXX" -> null
            }
          + lambda_function_association {
              + event_type   = "viewer-request"
              + include_body = true
              + lambda_arn   = (known after apply)
            }
        }

        # (7 unchanged blocks hidden)
    }


# aws_lambda_function.tp-dynamodb-streams will be updated in-place

~ resource "aws_lambda_function" "tp-dynamodb-streams" {
id = "tp-dev-dynamodb-streams"
~ last_modified = "2023-10-02T02:09:29.000+0000" -> (known after apply)
~ qualified_arn = "arn:aws:lambda:ap-northeast-1:XXXXXX" -> (known after apply)
~ qualified_invoke_arn = "arn:aws:apigateway:ap-northeast-1:lambda:path/2015-03-31/functions/arn:aws:lambda:ap-northeast-1:XXXXXX" -> (known after apply)
~ source_code_hash = "AAAAAA" -> "BBBBB"
tags = {
"Name" = "tp-dynamodb-streams"
"company" = "XXXX"
"environment_type" = "dev"
"project_name" = "XXXX XXXX"
"source_by" = "terraform"
}
~ version = "29" -> (known after apply) # (16 unchanged attributes hidden)

        # (4 unchanged blocks hidden)
    }

# aws_s3_bucket_policy.XXXXX will be updated in-place

~ resource "aws_s3_bucket_policy" "XXXXX" {
id = "XXXXX"
~ policy = jsonencode(
{ - Statement = [ - { - Action = "s3:GetObject" - Condition = { - StringEquals = { - "aws:SourceArn" = "arn:aws:cloudfront::XXXXXX"
}
} - Effect = "Allow" - Principal = { - Service = "cloudfront.amazonaws.com"
} - Resource = [

- "arn:aws:s3:::XXXXXXX/\*",
- "arn:aws:s3:::XXXXXXX",
  ] - Sid = "Allow CloudFront"
  },
  ] - Version = "2012-10-17"
  }
  ) -> (known after apply) # (1 unchanged attribute hidden)
  }

# aws_s3_bucket_policy.XXXXXX will be updated in-place

~ resource "aws_s3_bucket_policy" "XXXXX" {
id = "XXXXX"
~ policy = jsonencode(
{ - Statement = [ - { - Action = "s3:GetObject" - Condition = { - StringEquals = { - "aws:SourceArn" = "arn:aws:cloudfront::XXXXXX"
}
} - Effect = "Allow" - Principal = { - Service = "cloudfront.amazonaws.com"
} - Resource = [

- "arn:aws:s3:::XXXX/\*",
- "arn:aws:s3:::XXXX",
  ] - Sid = "Allow CloudFront"
  },
  ] - Version = "2012-10-17"
  }
  ) -> (known after apply) # (1 unchanged attribute hidden)
  }

```

</details>

これを見ると、lambda の sourceCodeHash が変わっていることが原因の様だった。

## 原因・対策

なんで変わったか、この sourceCodeHash はどのように取得しているかというと、lambda のコード(今回は.js)を zip 化してから hash を取得しているらしい(archive_file)が、<br/>
zip 化した後の permission が OS によって、異なるために発生しているらしい。また、それに加えて、.js の改行コードも統一されていないために、異なる sourceCodeHash が生成されていた模様。
<br/>
lambda 以外の差分は lambda の sourceCodeHash の変更に引っ張られたものであった。
<br/>
このため、該当の.tf ファイルに以下のように記載し、各.js ファイルの改行コードを統一した(LF で運用するようにした)。

```tf title="lambda.tf"
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "lambda.js"
  output_path = "lambda_XXXX.zip"
+  output_file_mode = "0644"
}
```

## 参考

第一ソースについて見失ったため、見つけ次第記載予定。

- https://zenn.dev/ikedam/articles/b98cb1acbb15de
