## Contribution guidelines

Contributions are very welcome. Please stick to the [code of conduct](./CODE_OF_CONDUCT.md) and, if possible, follow the issue templates.


### Commit message guidelines

Please use the following template for your commit messages.

```
type(scope): message

message-body

BREAKING CHANGE
Closes #4746
```

The message body can be multiple lines without any empty lines in between. If there is a breaking change please add the `BREAKING CHANGE` note.
If there is a related issue to this commit, please add a line containing `Closes/Fixes/Related to #ISSUENUMBER`. The type may be
one of the following

- feature (if new features are introduced)
- fix (if a bug was fixed and no features are introduced)
- package (for changes related to npm/travis configuration)
- misc (anything that does not fit in the above)
