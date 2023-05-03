import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import {getSortedPostsData} from "../lib/posts";
import Link from "next/link";
import Date from '../components/date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Floch Forster (フロック・フォルスター Furokku Forusutā?) was a former
          recruit (新兵 Shinpei?) of the Survey Corps. He joined the regiment
          before the return to Shiganshina District, where he was assigned to
          Squad Klaus.
        </p>
        <p>
          Other than Hange Zoë and Squad Levi, he was the only survivor of the
          battle.[4] After discovering the truth, Floch developed a hatred for
          humanity outside the Walls.[5] He was one of the Yeagerists becoming
          de-facto leader for the faction, he also believed Eren was the only
          one who can save the "New Eldian Empire" (新生エルディア帝国 Shinsei
          Erudia Teikoku?)
          {/* (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.) */}
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}> Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps(params) {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
