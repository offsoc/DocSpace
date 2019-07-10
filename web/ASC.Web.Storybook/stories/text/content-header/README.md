# Text

## Usage

```js
import { Text } from 'asc-web-components';
```

### <Text.ContentHeader>

Wraps the given text in the specified size of the content header.

#### Usage

```js
    <Text.ContentHeader title='Some title' isInline>
        Some text
    </Text.ContentHeader>
```

#### Properties

| Props              | Type     | Required | Values                      | Default   | Description                                                                                                                                      |
| ------------------ | -------- | :------: | --------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isDisabled`       | `bool`   |    -     | -                     | false     | Marks text as disabled                              |
| `title`            | `bool`   |    -     | -                     | -         | Title                                               |
| `truncate`         | `bool`   |    -     | -                     | false     | Disables word wrapping                              |
| `isInline`         | `bool`   |    -     | -                     | false     | Sets the 'display: inline-block' property           |