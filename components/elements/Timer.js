import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

const Timer = ({ endDateTime }) => {
  const { t } = useTranslation("common");
  const [timeParts, setTimeParts] = useState(getPartsOfTimeDuration());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const remainingTimeParts = getPartsOfTimeDuration();
  //     setTimeParts(remainingTimeParts);

  //     if (remainingTimeParts.days < 0) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  function getPartsOfTimeDuration() {
    const now = moment();
    const future = moment(endDateTime);
    const duration = moment.duration(future.diff(now));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return { days, hours, minutes, seconds };
  }

  const renderTimePart = (time, unit) => {
    if (time < 0) {
      return 0;
    }
    return time;
  };

  const hasTimeRemaining =
    timeParts.days > 0 || timeParts.hours > 0 || timeParts.minutes > 0 || timeParts.seconds > 0;

  return (
    <>
      {hasTimeRemaining && (
        <div className="deals-countdown">
          <span className="countdown-section">
            <span className="countdown-amount hover-up">{renderTimePart(timeParts.days, "days")}</span>
            <span className="countdown-period"> {t("days")} </span>
          </span>
          <span className="countdown-section">
            <span className="countdown-amount hover-up">{renderTimePart(timeParts.hours, "hours")}</span>
            <span className="countdown-period"> {t("hours")} </span>
          </span>
          <span className="countdown-section">
            <span className="countdown-amount hover-up">{renderTimePart(timeParts.minutes, "minutes")}</span>
            <span className="countdown-period"> {t("mins")} </span>
          </span>
          <span className="countdown-section">
            <span className="countdown-amount hover-up">{renderTimePart(timeParts.seconds, "seconds")}</span>
            <span className="countdown-period"> {t("sec")} </span>
          </span>
        </div>
      )}
    </>
  );
};

export default Timer;
