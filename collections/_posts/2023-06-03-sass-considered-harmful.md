---
authors:
  - brad-czerniak
#categories: ["one", "two"]
#date: 2020-03-03 02:02:02
#hero_classes: "background-color--main-dark color--white"
meta:
  description: "CSS preprocessors had a lot of promises but not a lot of delivery. It is time to dump them."
  image:
    alt: "It's CSS all the way down, and 'preprocessors' never did what you thought." # It's okay for this to be empty if the image is decorative
    src: 1200x630/share_sass-considered-harmful.png
#  robots: "index,follow"
#  title: "Overrides the tab title and social titles"
#permalink: /blog/post-title/
#published: true
#sitemap: true
tags: ["Meta", "CSS"]
title: "Sass considered harmful"
---

As I am wont to do, [I expressed an opinion on reddit and started a debate](https://www.reddit.com/r/webdev/comments/13z6amn/comment/jmqujfa/?context=3)
about a niche tech topic. Much like the topic, [Sass](https://sass-lang.com/) (and similar CSS 'pre/post-processors'),
the reddit thread got nested to the point of inefficiency, so here's a bit more breathing room to really explore the topic.

If you were local to the Detroit tech scene around 2013, you know that [10 years ago Vince and I had a public debate about CSS preprocessors](https://soundcloud.com/user-788953109/css-preprocessor-debate?si=e235fbdf3a604abeb920643061ac0c56&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing),
so this is not the first — but hopefully will be the last — time I've engaged folks on this topic.

If I were to coin a **tl;dr** that doesn't appear anywhere else in these 4000 words, it would be this:
<em class="font-size--1p125em color--third">CSS preprocessors are <strong>productivity theater</strong> and
<strong>technical debt</strong>, plain and simple.</em>

Also...

## The descriptor "CSS preprocessor" is incorrect

I'm grateful to [u/Scowlface](https://www.reddit.com/user/Scowlface/) for engaging with me in good faith. The one mistake
they made, in my eyes, is asking, "Okay, first, why be so pedantic?", and then claiming:

> "And it's not a "css generator", it's a CSS preprocessor."

By golly my new acquaintance _Scowlface_, **I have not yet begun to be _pedantic_**!

The existence of a CSS preprocessor like Sass or a postprocessor like PostCSS implies the existence of a middle step, _processing_,
that is important in some manner or fashion. That's simply not the case.

Both Sass and PostCSS do all their work before what is inevitably a CSS file getting loaded in a web browser to provide styles
for a web page. You could _almost_ just say PostCSS is a CSS preprocessor, too, and that the processing step is the browser
parsing the CSS and applying the defined styles to the DOM, but as we'll see shortly, that's not technically true.

The words people use to describe CSS preprocessors (and more incorrectly, 'postprocessors') were made up by the people selling
the software to the development community. Uncritically parroting that terminology not only does nobody any favors, but
in the case of insisting Sass isn't a "CSS generator" but rather a preprocessor, you're exchanging a good descriptor for
a crummy one. Tin-pot dictators will tell you they were birthed by the gods on a mountain peak and have gotten all holes-in-one
when golfing — but saying those things do not make them so, and repeating them plays right into their hands.

Sass is not CSS, nor is the more CSS-<em>like</em> SCSS syntax (and the same goes for LESS, Stylus, any non-native PostCSS
plugins, tailwind @apply, etc.). These are all DSLs (Domain-Specific Languages) that are parsed and interpreted _into_ CSS.
This distinction is important because Sass is called a "CSS Preprocessor", which implies taking CSS, pre-processing it,
and then ending up with pre-processed CSS. But that's not what happens. A non-CSS language is used to make CSS, hence why
it's much more accurate to call Sass and its ilk 'CSS generators' because that's what the tools do: they generate CSS from
something else (even if SCSS looks very CSS-y in many ways, the other available syntaxes show that it need not be).

This entire section isn't important in any real sense, except that if you're going to accuse me of both being pedantic and
saying something "patently false", it behooves you to think about the accusations for a second or two.

## A _worse_ developer experience

The following example, **like all Sass examples**, is open to criticism for not being a particularly good use of the technology.
The fact that so many Sass examples show bad practices should indicate to you that perhaps something is amiss.

Let's say you want to generate utility classes for 14 named colors, so you could put `background-color--grey-light` on any
element and have a light grey background, plus 13 other theme colors for the same concept.

The resulting CSS in either case will look like this:
```css
.background-color--black {
  background-color: #000;
}
.background-color--grey-dark {
  background-color: #444;
}
.background-color--grey {
  background-color: #ccc;
}
.background-color--grey-light {
  background-color: #fafafa;
}
.background-color--white {
  background-color: #fff;
}
.background-color--main {
  background-color: #007599;
}
.background-color--main-dark {
  background-color: #002733;
}
.background-color--main-light {
  background-color: #ccf4ff;
}
.background-color--second {
  background-color: #E32416;
}
.background-color--second-dark {
  background-color: #331716;
}
.background-color--second-light {
  background-color: #ffcfcc;
}
.background-color--third {
  background-color: #00838a;
}
.background-color--third-dark {
  background-color: #003033;
}
.background-color--third-light {
  background-color: #ccfcff;
}
```

In Sass you might use an [@each loop](https://sass-lang.com/documentation/at-rules/control/each) that would look like this:

```scss
$colors: ("black": "#000", "grey-dark": "#444", "grey": "#ccc", "grey-light": "#fafafa", "white": "#fff", "main": "#007599", "main-dark": "#002733", "main-light": "#ccf4ff", "second": "#E32416", "second-dark": "#331716", "second-light": "#ffcfcc", "third": "#00838a", "third-dark": "#003033", "third-light": "#ccfcff");

@each $name, $hex in $colors {
  .background-color--#{$name} {
    background-color: $hex
  }
}
```

The thing is, and this is true for darn-near anything you want to do in Sass, the toughest and most time-consuming parts
are:

  1. Typing out the map of names and hex codes
  2. Getting the syntax right for loops and stuff, effectively learning another new language

In contrast, with the same map but using regex find/replace in an editor like Sublime Text, you can make the classes one
time and get on with your life:

{% include atoms/image.html
  src="map-class-regex.png"
  alt="A Sublime Text editor window with the find/replace open to show a regex transform"
  classes=""
  caption="This basically does what a Sass loop does, but learning regular expressions is useful way beyond CSS, and it only has to run once."
%}

This is important because doing it the Sass way has a lot of disadvantages compared to making the classes as plain-old
CSS, **even if you took the time to type them all out rather than regex-ing up a map**:

  * Sass introduces overhead and delays to your build process
  * Sass requires you to sink time into learning its syntax(es)
  * With the @each loop, if you find the `background-color--black` class on an element via the browser devtools, searching the codebase won't find anything useful
  * Every time you make a change to your styling, **even a trivial one**, Sass has to re-iterate the loop to rebuild those classes
  * What happens if there's a breaking API change at some point? You're at the mercy of the Sass maintainers
  * What happens if the site is live for 5 years and then your client wants to make a change? See the dependency hell section below
  * What if you test your site and find that text just on the `second-light` background but not the others requires a little `text-shadow`?

And what's the benefit of all this inconvenience and overhead? Some zealots might claim that the @each Sass setup lets you
quickly and easily add the 15th and _nth_ background-color class, but, like...

<video controls autoplay loop muted name="media" height="354" width="494">
  <source src="/assets/other/fifteenth-class.mp4" type="video/mp4" />
</video>

FFS, copy and paste exists. It doesn't matter how many items are in the map: looping is guaranteed to lose you time compared
to writing CSS. It's just tech debt for tech debt's sake.

## Weird attitudes

Judging by all the downvotes I got in the reddit thread and [posts like this one by Rob O'Leary on dev.to](https://dev.to/robole/do-not-drop-sass-for-css-1ofm),
it kind of feels like there's a cult around Sass. If you use Sass and have a good opinion of it, have you ever taken a critical
eye to it? Do you feel a sunk-cost resistance to abandoning a tool you like and a skill you spent time learning?

The thing I hear people say is something along the lines of "CSS doesn't have certain features, but Sass adds them in. Sass
makes CSS into something more like a programming language." You can accuse me of building up a straw man here, but I've
heard that exact sentiment a lot. And the problem is, **it's 100% a misconception: Sass does no such thing**. Sass _itself_
is like a programming language, sure, but all it ever outputs is plain-old CSS. There's no escaping that. It doesn't add
features to CSS or make CSS more like a programming language: **it just generates bloat for you**.

I really don't know where the mentality comes from, but it's wild to me. Writing 'vanilla' CSS and not having to deal with
the nodejs ecosystem just to style pages is a great feeling, so if you've only ever done CSS by way of Sass, I
**strongly encourage you to try modern CSS without the Sass crutch** (and yes, clearly I've learned Sass and used it on
many projects throughout the years, so no hypocrisy here in asking you to try something new).

## Modern CSS is better than the Sass facsimiles

The original comment by [u/aguycalledmax](https://www.reddit.com/user/aguycalledmax/) I replied to that started the _scowly_
exchange said:

> "Even with nesting coming to native css I really don’t see any reason not to use scss or sass. The DRY and maintainability
> benefits of your code far outweigh the imperceptible negatives of a tiny build time on your local machine."

We'll get into why both the DRY/maintainability _and_ build time arguments are hogwash later, but for now I'd like to touch
on why we should wholeheartedly embrace **CSS Nesting** specifically (when browser support is up to snuff for your project)
and wholly abandon the same concept in CSS preprocessors.

[Creating a similar example to those from a post on the Sass blog](https://sass-lang.com/blog/sass-and-native-nesting),
here is some nested CSS that's valid in native CSS now, and is also valid SCSS nesting:

```scss
.base-class {
  padding: 20px;

  .foo {
    color: #eee;

    &.fighters {
      color: green;
    }
  }

  .bar {
    color: #ccc;

    &.fighters {
      color: red;
    }
  }

  .fizz {
    color: #fc0;

    .ylifting-drinks {
      color: #cf0;
    }
  }

  .buzz {
    color: rebeccapurple;
  }

  .fizzbuzz {
    color: #c0ffee;
  }
}
```

In native CSS, the nesting is interpreted with an implicit `:is()` wrapping the parent, keeping the selector specificity
very flat, which allows less-specific selectors if/when you need to override any selector. In contrast, all the selectors
generated by Sass in the build step have a specificity of at least 2. This isn't a big difference for a single level of
nesting, but can **make overriding a _lot_ more pleasant for deeper levels of nesting in native CSS**.

The other factor here is **payload size**. Even prior to minimizing, the CSS example above is **341** characters. That's
what you'd send over the wire and the size gets no bigger. It could get smaller with minimization and compression, but not
bigger.

In contrast, the Sass build process takes the nesting above and turns it into:

```css
.base-class {
  padding: 20px;
}

.base-class .foo {
  color: #eee;
}

.base-class .foo.fighters {
  color: green;
}

.base-class .bar {
  color: #ccc;
}

.base-class .bar.fighters {
  color: red;
}

.base-class .fizz {
  color: #fc0;
}

.base-class .fizz .ylifting-drinks {
  color: #cf0;
}

.base-class .buzz {
  color: rebeccapurple;
}

.base-class .fizzbuzz {
  color: #c0ffee;
}
```

The resulting CSS is **383** characters, or **12.3% larger**. Yes, gzip would be very effective on those repeated base-class
strings, but this is a small, simple example. More nesting makes both the specificity and the payload size issues worse
for Sass.

Similar arguments exist for CSS custom properties, `calc()`, [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/),
and the whole gamut of newer CSS features that have advantages over former Sass features. In the long run
**you benefit from embracing web standards over third-party tools**.

## Dependency hell is other people... 's build steps

There's this relief you feel whenever you've fought with npm or yarn to install the dependencies you want, then ran your
script successfully to do what you wanted it to. It's a familiar feeling for anyone who's ever done computer programming.

But dependencies are introducing technical debt into your project, sometimes to a greater extent than you considered at
first. If you've installed Sass and got it working, then done some stylesheet work for a while, then ran into a dependency
issue later, then fixed it to get Sass working again, you may be feeling something more like **Stockholm Syndrome** than
actual satisfaction.

With vanilla CSS, you can make a file named `styles.css` or similar, put some style directives in it, then reference the
file in a `<link>` tag in the head of your HTML documents, and you're off to the races. Yes, you can definitely make the
CSS building and attachment process a lot more complicated, but the minimum-viable example is pretty easy.

With Sass you have to do all the aforementioned things, but also:

  * Install Sass (locally, in dev containers, on remote servers, or perhaps all three)
  * Likely use nodejs and npm/nvm/yarn/whatever to bring in bundlers, frameworks, libraries, linters and analysis tools,
    watchers, and gosh knows what else
  * Glue all your build chain stuff together with scripts
  * Learn the Sass syntax
  * Run your script over your Sass files, or keep a watcher running
  * Wait for Sass to build and your other build process to complete **every time you make a change**
  * Maintain this dependency chain over the long term, including rewriting the bundler configs to support the new version
    of grunt/gulp/webpack/rollup/parcel/etc. when they needlessly change their API once every two years or so
  * Document how all of this works, well enough that the next person to join the team only loses a day to setting it up
  * Install helpers for your text editor or IDE
  * Learn the tricks for searching partial strings to find useful SCSS code, rather than whole strings in regular CSS
  * Learn, and continuously navigate, the function/mixin/library/framework Sass version of _callback hell_ where it's not
    clear how a particular CSS declaration inherits various property:value pairs because the Sass feature doing it is 3+
    levels deep and probably a million directories deep in `node_modules`
  * Keep up with both new CSS features _and_ changes to Sass/SCSS

This is all textbook technical debt. In order for any of it to make any sense, Sass would have to save you a ton of time
and/or produce much better code in order to justify all the time lost doing all the above-listed frustrating junk over the
lifetime of your project. The thing is: **there is no way you're making the time back up**. You're gonna lose time messing
around with Sass, and your frontend stack is more brittle for the privilege.

### 'Artifact' merge unpleasantness is a perennial team issue

At least once in your project you're gonna have to decide: **should we commit build artifacts?**

If you commit generated and minimized CSS output by Sass, the advantage is that you don't have to set up your servers to
do your front-end build process. Deployment is simpler, faster, and less error-prone. However, committing your build artifacts
is effectively setting yourself up for merge conflicts way more often than with regular CSS, as a team of even two developers
would create conflicting artifacts almost every time they touch the Sass on a feature branch.

If you don't commit build artifacts, your server will have to be set up to be just as capable as your local machine of building
CSS from your Sass source files. This, of course, is additional overhead just to get stylesheets working, and introduces
its own headaches.

Do you do frontend builds directly from a local machine? Or are you using containerization like docker-compose to have a
local simulation of a server? If you do use a container on your local, is your local dev container the same spec as containers
used for production? If not, then there's a solid chance that you have _at least_ two different sets of tooling with subtly-different
versions for the various constituent parts.

As frustrating as it can be for the dependencies not to install locally or for a syntax error to fail the build, it's
**even more frustrating when it works on your machine but fails on the server**. Tracking down what the heck must be different
is a solid way to lose an afternoon. And to reiterate, none of this is required — you're volunteering to use this optional
tool for some murky reason!

### It ain't gonna work later

It's pretty common for frontend work on a particular site to go quiet for years at a time, then for the site owner to shift
focus and want updates to their existing site. With plain-old CSS you're sure to encounter some weird old stuff, but you
can be pretty sure it'll just work. With Sass the opposite is true: **I'm comfortable claiming with 95% certainty that
you'll spend at least an hour fixing dependency issues before you can get back to writing styles**.

This comes down to both the commonly-paired-with-Sass nodejs ecosystem for build processes being _brittle as eff_ and pretty
irresponsible with notions like backwards compatibility (and yes, I get it, the ecosystem is getting more mature, and it's
not exactly fair to say it's Sass's or node's problem if gulp changes their config format every five minutes) _and_ with
the coin toss of whether your project was set up with the Ruby version of Sass, the C/C++ version, or the Dart one.

It's easy to brush this concern aside, since the pain won't be until 5 years later, but it's something you should know before
you sign up: as surely as the Sun will rise tomorrow, you will spend a significant fraction of your Sass-ing time getting
it to work anew when you revisit an older project. It will take up a lot of your time and it will likely be unpleasant.

### Death by a thousand builds

The beginning of this section already touched on how choosing Sass is signing up for more setup time, learning, and overall
difficulty than using plain CSS. One last point along those lines is the relatively-small slowdown of having your stylesheets
build whenever you make a change to your Sass source.

The site you're reading this post on uses a static site generator, Jekyll, to put the pages together when the code is deployed
or during development when any file is modified and saved. Fully building the site can take between 10 and 30 seconds today,
with the amount of content and assets the site builder has to process (perhaps ironically, the stylesheets _technically_
get processed by Sass, as Jekyll kind of makes you do that, even though the SCSS file contains vanilla CSS).

20-ish seconds is a long time to wait to be able to look in my browser window and see the changes reflected on the dev site.
The thing is, most of the activities like writing a blog post take a lot of time in the text editor between reloads. With
CSS, often you're writing a line or two and then checking your work, since the little increments and test tweaks all build
on each other. When you're changing two or three lines over the course of 30 seconds, an extra build time for Sass to complete
of a second or two (hopefully not more!) quickly adds up.

Any one build feels imperceptible, and might be a _welcome_ micro-break similar to the old-school trope of getting coffee
while your code compiles. But taken in the aggregate, and especially combined with the startup and maintenance costs of
using Sass, those build times turn into significant productivity loss.

Again, you'd have to see time savings in another way, or benefit significantly from code quality improvements, to justify
the kind of time lost to all this setup and waiting. **Somebody please show me the benefit. Please email me with a good
example that makes this make sense!**

## Many Sass features encourage bad behavior

Much of what I argue in this section is predicated on one simple principle: _The less CSS sent over the wire the better_.
Writing CSS directly and **seeing exactly what you're serving the user is helpful** toward avoiding bloat, technical debt,
and bad practices. In contrast, using Sass's leaky abstractions more often than not means never seeing the mess it's making
on your behalf.

One of _Scowlface_'s last arguments went like this:

> "If your argument is that since sass outputs css, that you can just write the css that sass would output, then yeah, sure,
> obviously. But it's not as easy, and that's the entire purpose of sass. That's like saying, "don't use PHP, just write
> C. Why write C when you can just do it in assembly? All these higher level languages just add bloat and slow down your
> program."

I see a few big problems with this line of reasoning:

  * Why is there **merit** in making it _easy_ to generate CSS that's necessarily more bloated than if you had written it directly?
  * There are absolutely times when you'd want to choose Assembly over C, and even more for C over PHP. Not every circumstance,
    but when performance and executable size are important, for sure. Love and respect to developers writing in low-level languages
  * Vanilla CSS vs. Sass is not an apples-to-apples comparison to C vs. PHP. CSS is a stylesheet language that only has
    Turing-complete features incidentally rather than being intended as a programming language in the usual sense (please
    note I'm not making a gatekeeping argument here — folks who write CSS are _developers_ for sure. Y'all are my people!),
    so Sass cannot and should not be considered a higher-level language than CSS: Sass does something entirely different
    than what CSS does
  * Sass is only _easy_ if you've already learned it and sunk the time into setting it up, **two things that are _hard_**.
    From scratch it's a tremendous hassle compared to just writing CSS

Let's look at Sass's feature set with the less-is-more concept in mind, and a healthy appreciation for utility-first architecture
that keeps your project's specificity graph nice and flat.

### Flow control

[See the Sass docs for an index of flow control items](https://sass-lang.com/documentation/syntax/structure)

Variables and conditionals, plus other primitives, all define logic that operates entirely within the Sass context rather
than the resultant CSS.

These features are all _inside baseball_ and can give you a deceptive impression of what the tool is doing. They're helpful,
insofar as if you're using Sass you need these primitives to accomplish anything, but are useless outside of Sass because
they're build-time resources rather than render-time.

To go back to an earlier example, you could use an `@if` to put a text shadow on just the `second-light` background-color
utility class. It would really ugly up that `@each` loop, and would require more time and effort than just pasting the
text-shadow property:value pair into the class in plain CSS. And note: no trace of the `@if` would show up in the CSS. Not
to sound like a broken record, but Sass features aren't CSS features — they only exist to generate plain old CSS.

By comparison, CSS custom properties — or CSS _variables_ as they're commonly known — work in the render context, making
them useful and interchangeable between systems. Similarly, the `calc()` and other functions, plus render-time CSS flow
control structures like `@supports` and `@media` accomplish what's needed in real-world styling.

These flow control features aren't actively harmful like some of the following examples, but they certainly help enable
accomplishing bad things.

### Nesting

See the "Modern CSS..." section above.

The **entire purpose** of nesting is to write something succinct that generates way more code than you wrote. It also,
by definition, is a way to chain specificity, which is also a _questionable thing to do_ when a utility-first approach keeps
your CSS payload small and makes overriding easier. The whole feature (moreso in Sass than the new native CSS equivalent)
encourages you to do something bad.

### Mixins and @extend

A blockquote earlier in this post alluded to DRY (Don't Repeat Yourself) and maintainability benefits of using Sass over
vanilla CSS. Both `@mixin` and `@extend` illustrate how being DRY in Sass makes your CSS very... _wet?_ Well, whatever you'd
call it, these features make it really easy to irresponsibly duplicate code in your CSS. `@extend` is also a good example
of how maintainability is an illusion.

In the reddit thread, I gave as an example a mixin for applying an old-school clearfix (which in the age of flexbox and
grid is far more of an edge case than years ago), which _Scowlyface_ dismissed as a "bad example". Keeping my pedantic streak
alive, [by the GitHub search numbers I'd rebut that it's a _good_ example](https://github.com/search?q=%22%40mixin+clearfix%22++path%3A*.scss&type=Code&ref=advsearch&l=&l=)
of how Sass features are commonly used to do _bad_ things.

_Scowlyface_ was right that `clearfix` should be a utility class that gets applied in markup where needed, rather than repeating
the same property:value pairs and pseudo-elements all over the codebase. This is a classic trap, of course, since the `@mixin`
and `@extend` features are _only_ useful for duplicating the output code while giving the illusion of not repeating yourself
if you only look at the Sass source. You simply can't provide a good example where duplicating code in this manner would
result in a healthier CSS codebase.

When applying a `clearfix` class would require clicking around your IDE sidebar to find the directory holding the correct
application logic or template file and then pasting the class in the correct place, then testing that the class is applied
and the styles are working, if you're already looking at the nested code block for the `.new-container` declaration and
can't be bothered to click, copy, _and_ paste in another file, the lazy developer will be happy to throw a

```scss
  @include clearfix;
```

...at the problem and call it a day. Nevermind that at best it's making a big comma-separated list of selectors that should
all repeat the same code, and at worst is repeating the same combinations of properties and values in pseudo-elements
all over the output CSS, because it 'saved' the developer precious time versus doing the job correctly.

Moreover, these features are among the Sass features that obfuscate the source of style directives, requiring a loss of
time for developer to track how many mixins and functions deep you have to go and how many variables and parameters you
have to parse (being mindful of the variables' scope, of course!) just to find where a particular line of output is coming
from. Time-savers these features are not.

{% include atoms/image.html
  src="mixin-docs.png"
  alt="Screenshot of the Sass site docs for mixins"
  classes="box-shadow--lifted-edges"
%}

Can you look at the example above and credibly say there's _any_ advantage to inserting a `@mixin` to make three little
classes? Isn't the CSS on its own a lot easier to understand and work with? Why on earth would you do this to yourself
willingly?

With `@extend`, additionally, you're often declaring an unenforced dependency. Let's say you have a class,

```css
.padded-box {
  padding: 20px;
}
```

and then in your SCSS later you want to make a padded box that has some more properties:

```scss
.fancy-padded-box {
  @extend .padded-box;
  background-color: #ffccff;
}
```

Depending on how you have your SCSS structured, `.fancy-padded-box` might be _miles_ away from the original `.padded-box`.
If a new member of the team sees the original `.padded-box` declaration and searches the markup for usages, not finding
any, and decides to delete it, the `.fancy-padded-box` class will error out. The new developer might not even see the failure
in their terminal window until an hour or two later, and by that time they've made so many changes that the notion of Sass
making the stylesheets less delete-key-friendly will have turned into a lot of time lost adding the extended class back.
**That's the opposite of a maintainability benefit**.

### Encouragement and a narrow use case

This has been a lot of words, many of them very negative, about Sass and other CSS preprocessors. Given that, and that I
bear no ill will toward my fellow humans, I wanted to take a second to acknowledge that the folks who made Sass and have
maintained it for over a decade has done a great thing — and I don't want to discourage either them or somebody thinking
of releasing their open-source tools in the future. The more tools the better, and for that matter the more debate the
better!

Having gone through lots of features and showing ways they can easily be misused, now might also be a good time to point
out two use cases where using Sass might be a net benefit:

  1. **If your codebase is already using Sass**: if you're maintaining an existing front end, swapping Sass for vanilla
    CSS probably wouldn't save you time for the remaining life of the frontend. But if you go to re-theme, all bets are off
  2. **If your team makes _lots_ of BEM(-like) components**: personally I see this as something of an anti-pattern, given
    the utility-centric direction frontend development has gone, but big teams with big applications with lots of components
    and _especially_ an existing Sass setup might benefit from the setup. Then again, if you're doing a BEM or SMACSS kind
    of thing from scratch in 2023, firstly... why? And second, you might consider native CSS nesting instead

Lastly, it's worth noting that the features of CSS preprocessors led the way to many of the CSS standards we embrace today,
so we owe a debt of gratitude to the Sass team for that.

## Rebuttals welcome

Did I get something wrong? Is there something great about CSS preprocessors I missed that justifies putting up with all
the crummy things I've highlighted here? Am I a doodyhead with a butthole for a face? If you've got an opinion and an ax
to grind because this site doesn't have a comment section, [tell me all about it](mailto:ao5357@gmail.com). There's a solid
chance I'll update the post with your rebuttal or link to your post.

<span class="color--third-dark font-size--p875em">Oh! Also, while I have you: if you any web development or strategy needs,
please check out <a href="https://solveitonce.com/">Solve it once</a>, my Drupal-focused web dev shop.</span>
