import clsx from "clsx";
import { LandingRating } from "./LandingRating";
import { LandingAvatar } from "./LandingAvatar";

export const LandingSocialRating = ({
  children,
  avatarItems,
  numberOfUsers = 100,
  suffixText = "happy users",
}) => {
  const numberText =
    numberOfUsers > 1000
      ? `${(numberOfUsers / 1000).toFixed(0)}k`
      : `${numberOfUsers}`;

  return (
    <div className="group flex flex-wrap gap-2">
      <div className="flex gap-1">
        {avatarItems.map((avatarItem, index) => (
          <LandingAvatar
            key={index}
            src={avatarItem.src}
            className={clsx(
              "relative",
              index === 1 || index === 2 ? `-ml-4` : "",
              index === 3 ? `-ml-5` : "",
              index > 3 ? `-ml-6` : ""
            )}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center gap-1">
        <LandingRating />

        {!children ? (
          <p className="text-xs max-w-sm text-white dark:text-slate-400 ">
            {numberText}+ {suffixText}
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  );
};
