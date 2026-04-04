import { redirect } from "next/navigation";

export default function LegacyNewEntryPage() {
  redirect("/entry/new");
}
