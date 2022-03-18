import express, { Request, Response, NextFunction } from "express";
import { TedTalksAPIService } from "./talks";

const app = express();
const port = 8888;

app.listen(port, () => console.log(`App is running on port ${port}`));

app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ message: "api is live" })
);

app.get("/talks", async (req: Request, res: Response, next: NextFunction) => {
  const data = await TedTalksAPIService.find();
  return res.status(200).json(data);
});

app.get(
  "/talks/count",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await TedTalksAPIService.count();
    return res.status(200).json(data);
  }
);

app.get(
  "/talks/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await TedTalksAPIService.search({
      query: req.query.query as string,
    });
    return res.status(200).json(data);
  }
);
