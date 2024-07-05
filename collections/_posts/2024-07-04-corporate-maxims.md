---
authors:
  - brad-czerniak
#categories: ["one", "two"]
#date: 2020-03-03 02:02:02
#hero_classes: "background-color--main-dark color--white"
meta:
  description: "When you find yourself part of a big corporation"
  image:
    alt: "Useful business-speak, heuristics, and smart-sounding gibberish." # It's okay for this to be empty if the image is decorative
    src: 1200x630/share_business-maxims.png
#  robots: "index,follow"
#  title: "Overrides the tab title and social titles"
#permalink: /blog/post-title/
#published: true
#sitemap: true
tags: ["Business"]
title: "Things I keep repeating in meetings"
---

One of the things I really like about [my friend Nick DeNardis' newsletter](https://nickdenardis.substack.com/)
is the pithy quote on top and usually-succinct linked articles with the easy-to-understand summaries Nick provides.

_As an aside_, I also love the following email newsletters:

  * [Links I Would Gchat You If We Were Friends](https://linksiwouldgchatyou.substack.com/)
  * [TLDR](https://tldr.tech/)
  * [Garbage Day](https://www.garbageday.email/)
  * [Today in Tabs](https://www.todayintabs.com/) / [Today on Trail](https://www.todayontrail.com/)
  * [Bad Astronomy Newsletter](https://badastronomy.beehiiv.com/)
  * [[Citation Needed]](https://www.citationneeded.news/)

If you're also the RSS-subscribing type, please reach out and I'll post a huge list of feeds I can't live without.

What follows is my attempt at being choosy about my favorite laws and quotes to pull out at meetings.

## 'Laws'

In a recent work conversation I was trying to remember which pseudo-laws were which, and went "There's
[Betteridge's Law of headlines](https://en.wikipedia.org/wiki/Betteridge%27s_law_of_headlines),
[Atwood's is the JavaScript one](https://www.laws-of-software.com/laws/atwood/),
[Godwin's is the Hitler one](https://en.wikipedia.org/wiki/Godwin%27s_law), but I can't remember..."

(For the most part this section doesn't have any [laws of UX](/docs/user-experience/ux-principles/), though those
are also worth a read.)

### [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law)

> "When a measure becomes a target, it ceases to be a good measure"

If you've read _Freakonomics_ or accidentally took four years of Econ courses in undergrad, you're likely quite
familiar with perverse incentive, so this law probably speaks to you.

This comes up in a corporate context because companies are always trying to measure whether they're doing well,
who's performing above average, and where they can improve. Measuring _something_ is important for those purposes,
but relying on any one measure can lead to unintended consequences:

  * Maximizing shareholder value can lead to layoffs and a decline in product quality
  * Relying on hours estimates can lead to burnout, which can lead to instituting story points, which can lead to gaming velocity
  * Having a Continuous Deployment benchmark of x deployments per week might lead to (x-1) deployments for deployment's sake
  * Targeting 99.999%+ uptimes as a department goal might bring deployments and changes to a stop, for fear of even a blip of downtime

Once you know this law you see it everywhere, but figuring out what to do about it is a different story altogether.
Some teams might try to avoid too many target measures, while others might have so many measure that the unintended
effects are spread around. It's a mixed bag.

### [Conway's law](https://en.wikipedia.org/wiki/Conway%27s_law)

> Organizations which design systems (in the broad sense used here) are constrained to produce designs which are copies of the communication structures of these organizations.

If you've ever heard "ship your org chart," this is where that comes from.

The place I see this play out most is in Information Architecture. If you squint at any site's main menu, there's
a solid chance you'll see Conway's law at play.

That's not to say that this law doesn't play out in software architecture, but it's definitely more manifest in navigation.
Perhaps you could make a case that microservices architecture or monorepos are a symptom of changing team dynamics
at big companies, though that may be a topic for another day.

### [Abilene paradox](https://en.wikipedia.org/wiki/Abilene_paradox)

> The Abilene paradox is a collective fallacy, in which a group of people collectively decide on a course of action that is counter to the preferences of most or all individuals in the group, while each individual believes it to be aligned with the preferences of most of the others.

This is less a 'law' than the consequence of a weird kind of groupthink, but I just had to include it. Ever since Prof. Holley
showed an old video about "The road to Abilene" in the Intro to Library Management course I took in 2007, this paradox has made
me a little paranoid during every group decision.

In my experience, very few people know about the Abilene paradox, which is a shame. If every group making a decision had
at least one person who knew about it and was willing to speak up, there might be fewer miserable groups out there.

## Bonus quote

> "...it has been said that democracy is the worst form of Government except for all those other forms..."

—[Winston S Churchill, 11 November 1947](https://winstonchurchill.org/resources/quotes/the-worst-form-of-government/)

No matter what you think of democracy, this is surely a clever quote. It appeals to me because lots of things are
trade-offs, and often folks don't appreciate what they'd be giving up by switching from the status quo.

If you worked on waterfall projects in the olden days, you have the context for agile's strengths, for instance. Not
a lot of people would say any form of agile is ideal or the _best_ form of project management; some may say it's the
worst form of project management, _except for all the others_.

Hope you liked these laws and bonus quote! Ever the optimist, I hope to post here more frequently!
