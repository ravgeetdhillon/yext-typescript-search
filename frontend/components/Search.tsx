import cx from "classnames";
import { Dispatch, SetStateAction } from "react";
import { Button, FormControl } from "react-bootstrap";

const SearchSuggestionsComponent = ({
  isLoading,
  results,
  value,
  setValue,
  handleSearchSuggestions,
  handleSearch,
}: {
  isLoading: boolean;
  results: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleSearchSuggestions: () => Promise<void>;
  handleSearch: () => Promise<void>;
}) => {
  return (
    <div className="d-flex align-items-start mb-4">
      <div className="me-3 w-100">
        <FormControl
          type="search"
          placeholder="Start typing..."
          value={value}
          onChange={async (e) => {
            setValue(e.target.value);
            await handleSearchSuggestions();
          }}
        />
        {isLoading || results.length === 0 ? (
          <></>
        ) : (
          <div className="bg-white border rounded position-absolute shadow-sm mt-1">
            <div className="px-3 py-2 text-muted small">Suggestions</div>
            {results.map((item: string, index: number) => (
              <div
                key={index}
                className={cx("px-3 py-2", {
                  "border-bottom": index != results.length - 1,
                })}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <Button onClick={handleSearch} disabled={isLoading}>
        Search
      </Button>
    </div>
  );
};

export { SearchSuggestionsComponent };
