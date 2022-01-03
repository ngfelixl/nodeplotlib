These are notes for the stream implementation of Nodeplotlib.

## General

- A plot window (**apps/web**) tries to connect to the server via a realtime api (e.g. websockets).
- The server recognizes the count of connected apps.
- If the user executes the `plot` function several times, it will only open a window if there is no
  open connection to a **apps/web**.

## Server lifecycle

- The server starts with the execution of the `plot` function if there is no active server running.
- The server stops if all **apps/web** are disconnected (and there were connections before).

## The plot function

- The plot function can either handle a `Plot` or an `Observable<Plot>`.
  - It creates an `Observable<Plot>` by using Rxjs' `of` observable constructor.
- The plot streams are saved in a Plots Set.
- If there is an active **apps/web** that listens to the server, it subscribes to all Plots in the Set.
- It does not submit a whole "plots" object, but rather submits all plots one by one. The reason is
  realtime data, for which only the updated plot should be transmitted.
- If all **apps/web** are disconnected, it should close the observable subscriptions of the plots and close
  the server as mentioned in the **server lifecycle** section.

## The stack function

- Is the `stack` function really needed? Stack served the purpose that only one window opens which
  could display several plots.

## The clear function

- The `clear` function is also probably not needed. Just close all windows and it should close the
  subscriptions to the plots and streams.

## Backlog

- The user can remove plots from the frontend. If that happened it submits a message to the
  backend so that the subscription can be cancelled and the plot stream can be removed from the plots set.

## Frontend only

- The user has the possibility to rearrange plots per drag and drop.
- The user can resize the individual plot windows.

## Development

To start the app for development purposes run

```
npm run build web -- --watch
npm start dev-server
```
