import cx from "classnames";
import { TedTalk } from "../types/TedTalk";

const TedTalksComponent = ({
  isLoading,
  results,
}: {
  isLoading: boolean;
  results: TedTalk[];
}) => {
  return isLoading || results.length === 0 ? (
    <div>Nothing found</div>
  ) : (
    <>
      {results.map((item: TedTalk, index: number) => (
        <div
          key={index}
          className={cx("py-3", {
            "border-bottom": index != results.length - 1,
          })}
        >
          {/* 1 */}
          <div className="fw-bold">{item.title}</div>
          <div className="text-muted">
            By <b>{item.author}</b> &bull; {item.views} views
          </div>
          <a href={item.link} className="small">
            View
          </a>
        </div>
      ))}
    </>
  );
};

export { TedTalksComponent };
