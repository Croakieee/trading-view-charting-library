## :warning: WARNING :warning:

### Our documentation has moved to a [new site](https://www.tradingview.com/charting-library-docs/)

You can find the corresponding page here: [Account Manager](https://www.tradingview.com/charting-library-docs/)
<br>
The corresponding page for Broker-Api can be found [here](https://www.tradingview.com/charting-library-docs/latest/trading_terminal/Broker-API).

---

<br/>
<br/>

:chart: All content on this page is relevant to [Trading Terminal](Trading-Terminal) only.

Account Manager is an interactive table that displays trading information.
It includes 3 pages: orders/positions and account information.

To create an account manager you will need to describe columns of each page and provide data.

Remark 1. [Broker API](Broker-API) should implement [accountManagerInfo](Broker-API#accountmanagerinfo)

<!--
Be sure that you have the following structure:
## Fields group name
### Field name
### Field name
#### Field subitem description
-->

# Account Manager Meta Information

The following information should be returned by [accountManagerInfo](Broker-API#accountManagerInfo).

## Account Manager header

Account Manager's header includes the name of the broker and a summary.

### accountTitle: String

### summary: array of [SummaryField](#summaryfield)

You can display your own custom fields that will always be shown above the pages.

## Orders Page

### orderColumns: array of [Column](#column-description)

Columns description that you want to be displayed on the Orders page.
You can display any field of an [order](Trading-Objects-and-Constants#order) or add your own fields to an order object and display them.

### orderColumnsSorting: [SortingParameters](#sortingparameters)

Optional sorting of the table.

### possibleOrderStatuses: array of [OrderStatus](Trading-Objects-and-Constants#orderstatus)

Optional list of statuses to be used in the orders filter. Default list is used if it hasn't been set.

### historyColumns: array of [Column](#column-description)

History page will be displayed if it exists. All orders from previous sessions will be shown in the History.

### historyColumnsSorting: [SortingParameters](#sortingparameters)

Optional sorting of the table.

## Positions Page

### positionColumns: array of [Column](#column-description)

You can display any field of a [position](Trading-Objects-and-Constants#position) or add your own fields to a position object and display them.

## Additional Pages (e.g. Account Summary)

### pages: array of [Page](#page)

You can add new tabs in the Account Manager by using `pages`. Each tab is a set of tables.

#### Page

`Page` is a description of an additional Account Manager tab. It is an object with the following fields:

1. `id`: String

    Unique identifier of a page

1. `title`: String

    Page title. It is the tab name.

1. `tables`: Array of [Table](#table).

    It is possible to display one or more tables in this tab.

#### Table

You can add one or more tables to a [Page](#page).
Account Summary table metainfo is an object with the following fields:

1. `id`: String

    Unique identifier of a table.

1. `title`: String

    Optional title of a table.

1. `columns`: array of [Column](#column-description)

1. `getData`: Promise

    This function is used to request table data. It should return Promise (or Deferred) and resolve it with an array of data rows.

    Each row is an object. Keys of this object are column names with the corresponding values.

    There is a predefined field `isTotalRow` which can be used to mark a row that should be at the bottom of the table.

1. `changeDelegate` : [Delegate](Delegate)

    This delegate is used to watch the data changes and update the table. Pass new account manager data row by row to the `fire` method of the delegate.

1. `initialSorting`: [SortingParameters](#sortingparameters)

    Optional sorting of the table. If set, then the table will be sorted by these parameters, if the user has not enabled sorting by a specific column.

**NOTE**: make sure that you have a unique string `id` field in each row to identify it.

#### SortingParameters

Object with the following properties:

1. `property` - property of the data object that will be used for sorting.

1. `asc` - (optional, default `true`) - If it is `false`, then initial sorting will be in descending order.

## Formatters

### customFormatters: array of a column formatter description

Optional array to define custom formatters. Each description is an object with the following fields:

1. `name`: FormatterName

    Unique name of a formatter.

1. `formatText`: [TableFormatTextFunction](#tableformattextfunction)

    Function that is used for formatting of a cell value to `string`. Required because used to generate exported data.

1. `formatElement`: [CustomTableFormatElementFunction](#customtableformatelementfunction) | undefined

    Optional function that is used for formatting of a cell value to `string` or `HTMLElement`.

If the `formatElement` function is provided, then only it will be used to format the displayed values, otherwise `formatText` will be used. If you need to only display `string` values it is better to use only `formatText` for performance reasons.

#### Example

```ts
{
    name: 'closeButton' as FormatterName, // Typecast to FormatterName. Use constant in real code
    formatText: () => '', // Returns an empty string because we don't need to display this in the exported data
    formatElement: ({ values: [id] }: TableFormatterInputs<[id: string]>) => {
        const button = document.createElement('button');

        button.innerText = 'Close';

        button.addEventListener('click', () => {
            event.stopPropagation();

            closePosition(id);
        });

        return button;
    },
}
```

#### CustomTableFormatElementFunction

A function that takes an [TableFormatterInputs](#tableformatterinputs) object and returns a `string` or an `HTMLElement`.

#### TableFormatTextFunction

A function that takes an [TableFormatterInputs](#tableformatterinputs) object and returns a `string`.

#### TableFormatterInputs

An object with the following fields:

1. `values` - array of values to be formatted. Values ​​are obtained by extracting dependent properties from the data object, for details please see [dataFields](#datafields).

1. `prevValues` - optional field. It is array of previous values so you can compare and format accordingly. It exists if current column has the `highlightDiff: true` key.

1. `priceFormatter` - standard formatter for price. You can use `format(price)` method to prepare price value.

## Column description

The most valuable part of Account Manager description is a description of its columns.

### id

Column id. Unique identifier of column.

### label

Column title. It will be displayed in the table's header row.

### alignment

Horizontal alignment of the cell value. The default value is `left`.

| alignment    |   description  |
|--------------|----------------|
| left         | It aligns the cell value to the left |
| right        | It aligns the cell value to the right |

### formatter

Name of the formatter to be used for data formatting. It can be one of two types - `StandardFormatterName` or `FormatterName`. If `formatter` is not set, then the value is displayed as is.
Formatter can be a default or a custom one.

Default formatter names are listed in `StandardFormatterName` enumerator. If you want to use a custom formatter, you must typecast its name to `FormatterName` to confirm your confidence that you are using the correct name.

Here is the list of default formatters:

| name | description |
| ---- | ----------- |
| `StandardFormatterName.Date` | Displays the date or time. |
| `StandardFormatterName.DateOrDateTime` | Displays the date or date and time. This formatter accepts an `{dateOrDateTime: number, hasTime: boolean}` object. If `hasTime` is set to `true` then the date and time are displayed. Otherwise only the date is displayed.|
| `StandardFormatterName.Fixed` | Displays a number with 2 decimal places. |
| `StandardFormatterName.FormatPrice` | Displays symbol's price. |
| `StandardFormatterName.FormatQuantity` | Displays an integer or floating point quantity, separates thousands groups with a space. |
| `StandardFormatterName.FormatPriceForexSup` | The same as `formatPrice`, but it makes the last character of the price superscripted. It works only if instrument type is set to `forex`.|
| `StandardFormatterName.LocalDate` | Displays the local date or time. |
| `StandardFormatterName.LocalDateOrDateTime` | The same as `StandardFormatterName.DateOrDateTime`, but it displays time in the local timezone. |
| `StandardFormatterName.Pips` | Displays a number with 1 decimal place. |
| `StandardFormatterName.Profit` | Displays profit in account currency. It also adds the `+` sign, separates thousands and changes the cell text color to red or green. |
| `StandardFormatterName.ProfitInInstrumentCurrency` | Displays profit in instrument currency. It also adds the `+` sign, separates thousands and changes the cell text color to red or green. |
| `StandardFormatterName.Side` | It is used to display the side: Sell or Buy. |
| `StandardFormatterName.PositionSide` | It is used to display the position side: Short or Long. |
| `StandardFormatterName.Status` | It is used to format the `status`. |
| `StandardFormatterName.Symbol` | It is used for a symbol field. It displays `brokerSymbol`, but when you click on a symbol the chart changes according to the `symbol` field. |
| `StandardFormatterName.Text` | Displays a text value. |
| `StandardFormatterName.Type` | It is used to display the type of order: Limit/Stop/StopLimit/Market and type of bracket: TakeProfit/StopLoss/TrailingStop. |
| `StandardFormatterName.VariablePrecision` | Displays a number with variable precision. |

### dataFields

`dataFields` is an array with data object fields that is used to get the data to display in a column. The displayed value in the column will only change if one of the corresponding data object values ​​change. If the `formatter` is not set, the displayed values ​​will be space-separated in the column. If a `formatter` is specified, it will only get the specified values. Specify an empty array as the `dataFields` and the formatter will receive the entire data object.

#### Example

If you have column with `dataFields` set as `['avgPrice', 'qty']`, then displayed value will update only if `avgPrice` or `qty` values of the data object have been changed.

If you have column with `dataFields` set as `[]`, then displayed value will update if some data object values have been changed.

### sortProp

Optional `sortProp` is a data object key that is used for data sorting. If `sortProp` is not provided, then the first element of the `dataFields` array will be used. If the `dataFields` array is empty, then column sorting will be unavailable.

### notSortable

Optional `notSortable` can be set to prevent column sorting.

### help

`help` is a tooltip string for the column.

### highlightDiff

`highlightDiff` can be set with `StandardFormatterName.FormatPrice` and `StandardFormatterName.FormatPriceForexSup` formatters to highlight the changes of the field. If set to `true` then custom formatters will also get previous values.

### notHideable

Optional `notHideable` parameter can be set to prevent the column from hiding.

### hideByDefault

Optional `hideByDefault` parameter can be set to hide the column by default.

### tooltipProperty

`tooltipProperty` is a key of the row object that is used to get the tooltip to display when hovering over a cell. The tooltip property refers to an object whose keys are property names and values are the corresponding tooltips.

### supportedStatusFilters

An optional numeric array of order statuses that is applied to order columns only. If it is available then the column will be displayed in the specified tabs of the status filter only.

Here is the list of possible order statuses:

1. 0 - All
1. 1 - Canceled
1. 2 - Filled
1. 3 - Inactive
1. 5 - Rejected,
1. 6 - Working

### isCapitalize

If it is `true`, the first character of every word in the sentence in the column will be capitalized. The default value is `true`.

### showZeroValues

If it is `false`, the zero values will be hidden. The default value is `true`.

## SummaryField

`SummaryField` is an object with the following fields:

1. `text`: String

    Displays a text value.

1. `wValue`: WatchedValue

    A [WatchedValue](WatchedValue) object that can be used to read the state of field.

1. `formatter`: [StandardFormatterName](#formatter)

    Name of the formatter, for details please see [formatter](#formatter).

1. `isDefault`: Boolean

    Optional `isDefault` parameter can be set to display the field by default.

## Context Menu

### contextMenuActions(contextMenuEvent, activePageActions)

`contextMenuEvent`: MouseEvent or TouchEvent object passed by a browser

`activePageActions`: array of `ActionMetaInfo` items for the current page

Optional function to create a custom context menu.
It should return `Promise` that is resolved with an array of `ActionMetaInfo`.
