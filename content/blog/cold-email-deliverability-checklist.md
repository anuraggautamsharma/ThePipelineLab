---
title: "The Cold Email Deliverability Checklist for 2026"
description: "A practical, engineering-grade checklist to land cold email in the primary inbox: domains, DNS, warmup, volume math, content patterns and monitoring."
date: "2026-06-02"
tags: ["Deliverability", "Cold Email"]
author: "The Pipeline Lab"
---

Deliverability is the silent killer of outbound. Your copy can be perfect and your list immaculate — if 40% of your sends land in spam, your pipeline math collapses before a human ever reads a word. This is the checklist we run for every system we build, in the order we run it.

## What actually determines cold email deliverability?

Three things, in order of weight: **sender reputation** (your domains and IPs), **technical authentication** (DNS records that prove you are who you say you are), and **engagement signals** (how recipients interact with your mail). Most teams obsess over content and ignore the first two — which is backwards. Mailbox providers score the sender long before they score the message.

## Step 1: Never send cold email from your primary domain

Your root domain carries your company's entire email reputation — invoices, support, internal mail. One bad cold campaign can poison it for months.

- Buy 3–10 **secondary domains** that are close variants of your brand (`getacme.com`, `acmehq.com`, `tryacme.com`).
- Point each domain's root to your real website with a 301 redirect.
- Run **2–3 mailboxes per domain, maximum**. More than that on one domain concentrates risk.

## Step 2: Get the DNS trio right — SPF, DKIM, DMARC

Authentication is binary: it's either correct or you're losing placement. Every sending domain needs:

| Record | What it proves | Common mistake |
| --- | --- | --- |
| SPF | These servers may send for this domain | Multiple SPF records (only one is allowed) |
| DKIM | The message wasn't altered in transit | Forgetting to rotate keys per provider |
| DMARC | What to do when SPF/DKIM fail | No DMARC record at all — providers now require it |

Since Google and Yahoo's bulk-sender rules, **DMARC is mandatory** for anyone sending at volume. Start at `p=none` for monitoring, move to `p=quarantine` once aligned.

## Step 3: Warm up for 3–4 weeks before campaigns touch a mailbox

A new mailbox that immediately sends 100 cold emails a day looks exactly like a spammer, because that is exactly what spammers do.

- Weeks 1–2: warmup tool only, ramping gradually to a few dozen sends a day.
- Weeks 3–4: keep warmup running, layer in low campaign volume.
- Steady state: **20–30 cold sends per mailbox per day**, warmup left on at a low ratio.

The math that follows: if you need 10,000 sends a month, that's roughly 17 mailboxes across 6–8 domains — not two mailboxes pushed to their limits.

## Step 4: Write like a human, structurally

Content filters are pattern-matchers. Deny them patterns:

- Plain text only. No tracking pixels if you can live without open rates (you can — reply rate is the metric that matters).
- No more than **one link**, and only in later follow-ups.
- Avoid spam-trigram phrases ("100% free", "act now", "no obligation") and image attachments.
- Vary your sending patterns. Identical messages fired at identical intervals are a fingerprint; spintax and randomized send windows blur it.

## Step 5: Monitor placement weekly, not when replies dry up

By the time reply rate collapses, you've usually been in spam for two weeks.

- Run **inbox placement tests** weekly across Google, Microsoft and secondary providers.
- Watch bounce rate like a hawk: anything above **2%** means your data verification is failing, and bounces compound reputation damage.
- Check blacklists (Spamhaus, Barracuda) on a schedule, and retire any domain that gets burned — that's why you bought several.

## The one-page checklist

1. Secondary domains purchased, redirected, never your root domain
2. SPF, DKIM, DMARC live and verified on every sending domain
3. 2–3 mailboxes per domain, warmed for 3+ weeks
4. ≤30 cold sends per mailbox per day, warmup always on
5. Plain text, one link max, spintax variation
6. Verified data only — bounce rate under 2%
7. Weekly placement tests and blacklist checks

Deliverability isn't a one-time setup; it's an operating discipline. Treat it like infrastructure — monitored, redundant, and boring — and the inbox takes care of itself.
