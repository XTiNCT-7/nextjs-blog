import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fN) => {
    const id = fN.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fN);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as {date:string; title: string}),
    };
  });

  return allPostData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fN) => {
    return {
      params: {
        id: fN.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fP = path.join(postsDirectory, `${id}.md`);
  const fC = fs.readFileSync(fP, "utf-8");

  const mR = matter(fC);

  const processedContent = await remark().use(html).process(mR.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(mR.data as { date: string; title: string }),
  };
}
