import { NextPage } from "next/types";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useCallback } from "react";
import { TedTalksAPIService } from "../services/TedTalksApi";
import { TedTalk } from "../types/TedTalk";
import { TedTalksComponent } from "../components/TedTalk";
import { SearchSuggestionsComponent } from "../components/Search";

const Home: NextPage = () => {
  const [isSearchResultsLoading, setIsSearchResultsLoading] =
    useState<boolean>(false);
  const [isSearchSuggestionsLoading, setIsSearchSuggestionsLoading] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TedTalk[]>([]);
  const [searchSuggestionResults, setSearchSuggestionsResults] = useState<
    string[]
  >([]);

  const handleSearchSuggestions = useCallback(async () => {
    setIsSearchSuggestionsLoading(true);
    const data: string[] = await TedTalksAPIService.autocomplete({
      query: searchQuery,
    });
    setSearchSuggestionsResults(data);
    setIsSearchSuggestionsLoading(false);
  }, [searchQuery]);

  const handleSearch = useCallback(async () => {
    setIsSearchResultsLoading(true);
    const data: TedTalk[] = await TedTalksAPIService.search({
      query: searchQuery,
    });
    setSearchResults(data);
    setSearchSuggestionsResults([]);
    setIsSearchResultsLoading(false);
  }, [searchQuery]);

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg="7" className="mx-lg-auto">
            <h1 className="mb-5 border-bottom">Search Ted Talks</h1>
            <SearchSuggestionsComponent
              isLoading={isSearchSuggestionsLoading}
              results={searchSuggestionResults}
              value={searchQuery}
              setValue={setSearchQuery}
              handleSearchSuggestions={handleSearchSuggestions}
              handleSearch={handleSearch}
            />
            <TedTalksComponent
              isLoading={isSearchResultsLoading}
              results={searchResults}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
