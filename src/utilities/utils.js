import * as Constants from '../constants/appConstants';

export const validateTimePeriod = (incomingTimePeriod) => {
    let timePeriod = Constants.TIME_PERIOD_12_MONTHS;

    if (incomingTimePeriod) {
        // Check a user supplied (url) timePeriod is valid
        if (incomingTimePeriod === Constants.TIME_PERIOD_7_DAYS ||
            incomingTimePeriod === Constants.TIME_PERIOD_1_MONTH ||
            incomingTimePeriod === Constants.TIME_PERIOD_6_MONTHS ||
            incomingTimePeriod === Constants.TIME_PERIOD_12_MONTHS ||
            incomingTimePeriod === Constants.TIME_PERIOD_OVERALL) {
            timePeriod = incomingTimePeriod;
        }
    }

    return timePeriod;
};