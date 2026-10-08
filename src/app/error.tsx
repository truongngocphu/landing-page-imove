"use client";
import { ButtonLink, Eyebrow } from "@/components/ui";
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="container page-hero"><Eyebrow>KẾT NỐI TẠM GIÁN ĐOẠN</Eyebrow><h1>Thử lại một chút.<br /><span>Tiếp tục hành trình.</span></h1><p>Trang chưa thể tải đầy đủ. Bạn có thể thử mở lại hoặc quay về trang chủ.</p><div className="hero-actions"><button className="button button-primary" onClick={reset}>Thử lại</button><ButtonLink secondary href="/">Về trang chủ</ButtonLink></div></section>; }
