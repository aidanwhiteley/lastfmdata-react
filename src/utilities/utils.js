import * as Constants from '../constants/appConstants';

export function validateTimePeriod(incomingTimePeriod) {
    let timePeriod = Constants.TIME_PERIOD_OVERALL;

    if (incomingTimePeriod) {
        // Check a user supplied (url) timePeriod is valid
        if (incomingTimePeriod === Constants.TIME_PERIOD_7_DAYS ||
            incomingTimePeriod === Constants.TIME_PERIOD_1_MONTH ||
            incomingTimePeriod === Constants.TIME_PERIOD_6_MONTHS ||
            incomingTimePeriod === Constants.TIME_PERIOD_OVERALL) {
            timePeriod = incomingTimePeriod;
        }
    }

    return timePeriod;
}