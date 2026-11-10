import { Fragment, type ReactNode } from "react";
import { headingId } from "../lib/format";
import { hrefFor } from "../lib/path";
import { useRoute } from "./route";

function inline(text: string, from: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] && match[2]) {
      const raw = match[2];
      const href = raw.startsWith("/") ? hrefFor(from, raw.endsWith("/") || raw.includes("#") || raw.includes("?") ? raw : `${raw}/`) : raw;
      nodes.push(<LinkLike key={`${key}-${index}`} href={href}>{match[1]}</LinkLike>);
    } else if (match[3]) nodes.push(<strong key={`${key}-${index}`}>{match[3]}</strong>);
    else nodes.push(<code key={`${key}-${index}`}>{match[4]}</code>);
    last = match.index + match[0].length;
    index += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function LinkLike({ href, children }: { href: string; children: ReactNode }) {
  const route = useRoute();
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return <a href={href}>{children}</a>;
  }
  return <a href={href} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.button !== 0) return; event.preventDefault(); route.go(href); }}>{children}</a>;
}

export function Markdown({ source }: { source: string }) {
  const { path } = useRoute();
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;
  const nextKey = () => `b${key++}`;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|\s*-+/.test(lines[i])) rows.push(lines[i].split("|").slice(1, -1).map((cell) => cell.trim()));
        i += 1;
      }
      blocks.push(
        <div className="table-wrap" key={nextKey()}>
          <table>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((cell, cellIndex) => rowIndex === 0 ? <th key={cellIndex}>{inline(cell, path, `${rowIndex}-${cellIndex}`)}</th> : <td key={cellIndex}>{inline(cell, path, `${rowIndex}-${cellIndex}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (/^---+$/.test(line.trim())) { blocks.push(<hr key={nextKey()} />); i += 1; continue; }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const explicit = /\{#([a-z0-9-]+)\}/.exec(heading[2]);
      const text = heading[2].replace(/\s*\{#[^}]+\}\s*/, "");
      const id = headingId(text, explicit?.[1]);
      const Tag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
      blocks.push(<Tag id={id} key={nextKey()}>{inline(text, path, id)}</Tag>);
      i += 1;
      continue;
    }
    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) { quote.push(lines[i].replace(/^>\s?/, "")); i += 1; }
      blocks.push(<blockquote className="panel" key={nextKey()}>{quote.map((part, index) => part.trim() ? <p key={index}>{inline(part, path, `q${index}`)}</p> : null)}</blockquote>);
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, "")); i += 1; }
      blocks.push(<ul key={nextKey()}>{items.map((item, index) => <li key={index}>{inline(item, path, `li${index}`)}</li>)}</ul>);
      continue;
    }
    const para: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|>\s?|\|\s*|---|\s*[-*]\s+)/.test(lines[i])) { para.push(lines[i]); i += 1; }
    blocks.push(<p key={nextKey()}>{inline(para.join(" "), path, `p${key}`)}</p>);
  }
  return <div className="prose">{blocks.map((block, index) => <Fragment key={index}>{block}</Fragment>)}</div>;
}
