import * as Sentry from "@sentry/browser";

//const isLocal = process.env.NODE_ENV === "development";
const isLocal = false;

export function initSentry() {
    if (isLocal) {
        return;
    }

    Sentry.init({
        dsn: "https://e217f43d9d8847b09e861afd62396975@o4505415801372672.ingest.sentry.io/4505415813627904",
    });
}

export function logError(error, errorInfo = null) {
    if (isLocal) {
        return;
    }

    Sentry.withScope((scope) => {
        errorInfo && scope.setExtras(errorInfo);
        Sentry.captureException(error);
    });
}

export function onError(error) {
    let errorInfo = {};
    let message = error.toString();

    if (!(error instanceof Error) && error.message) {
        errorInfo = error;
        message = error.message;
        error = new Error(message);
    } else if (error.config && error.config.url) {
        errorInfo.url = error.config.url;
    }

    logError(error, errorInfo);

    alert(message);
}
