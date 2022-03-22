import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { TedTalksAPIService } from "./talks";
import type { TedTalk } from "./types";

const app = express();
const port = 8888;

app.use(cors());

app.listen(port, () => console.log(`App is running on port ${port}`));

app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ message: "api is live" })
);

app.get("/talks", async (req: Request, res: Response, next: NextFunction) => {
  const data: TedTalk[] = await TedTalksAPIService.find();
  return res.status(200).json(data);
});

app.get(
  "/talks/count",
  async (req: Request, res: Response, next: NextFunction) => {
    const data: number = await TedTalksAPIService.count();
    return res.status(200).json(data);
  }
);

app.get(
  "/talks/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const data: TedTalk[] = await TedTalksAPIService.search({
      query: req.query.query as string,
    });
    return res.status(200).json(data);
  }
);

app.get(
  "/talks/autocomplete",
  async (req: Request, res: Response, next: NextFunction) => {
    const data: string[] = await TedTalksAPIService.autocomplete({
      query: req.query.query as string,
    });
    return res.status(200).json(data);
  }
);
