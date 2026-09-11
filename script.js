/* =====================================================
AI VAULT - COMPLETE REPLACEMENT script.js
234 AI WEBSITES
===================================================== */

function getCategoryIcon(category) {
    const icons = {
        Chat: "fa-solid fa-comments",
        Coding: "fa-solid fa-code",
        Image: "fa-solid fa-image",
        Video: "fa-solid fa-video",
        Writing: "fa-solid fa-pen-nib",
        Audio: "fa-solid fa-microphone",
        Research: "fa-solid fa-magnifying-glass-chart",
        Productivity: "fa-solid fa-bolt"
    };

    return icons[category] || "fa-solid fa-wand-magic-sparkles";
}


const categoryPurposes = {
    Chat: ["study", "research", "writing", "business"],
    Coding: ["coding"],
    Image: ["image", "design"],
    Video: ["video"],
    Writing: ["writing", "study"],
    Audio: ["audio"],
    Research: ["research", "study"],
    Productivity: ["business", "study", "presentation"]
};


const categoryDescriptions = {
    Chat: "AI assistant for conversations, learning, research, writing and everyday tasks.",
    Coding: "AI-powered coding tool for programming, development and software creation.",
    Image: "AI creative tool for generating, editing and improving images and designs.",
    Video: "AI platform for creating, editing and generating video content.",
    Writing: "AI writing assistant for creating, rewriting and improving written content.",
    Audio: "AI audio tool for voice, speech, music and sound creation.",
    Research: "AI research tool for discovering, understanding and organizing information.",
    Productivity: "AI productivity tool designed to automate work and help you get more done."
};


/* =====================================================
234 AI TOOLS
===================================================== */

const TOOL_DATA = `
1|ChatGPT|Chat|Freemium|https://chatgpt.com/|assistant,coding,writing,student,research|rating=4.9;reviews=2.4k;icon=fa-solid fa-atom;trending;student;purposes=study,coding,writing,research,business
2|Google Gemini|Chat|Freemium|https://gemini.google.com/|google,research,student|rating=4.8;icon=fa-solid fa-star;trending;student
3|Claude|Chat|Freemium|https://claude.ai/|anthropic,writing,analysis,coding|rating=4.8;trending;student;purposes=study,coding,writing,research,business
4|Microsoft Copilot|Chat|Freemium|https://copilot.microsoft.com/|microsoft,assistant,student|student
5|Grok|Chat|Freemium|https://grok.com/|assistant,research,chat|trending
6|Poe|Chat|Freemium|https://poe.com/|chatbots,models,assistant|
7|You.com|Chat|Freemium|https://you.com/|search,assistant,research|
8|Pi AI|Chat|Free|https://pi.ai/|conversation,assistant|
9|HuggingChat|Chat|Free|https://huggingface.co/chat/|opensource,huggingface,chat|
10|Meta AI|Chat|Free|https://www.meta.ai/|meta,assistant|
11|Mistral Le Chat|Chat|Freemium|https://chat.mistral.ai/|mistral,assistant|
12|DeepSeek|Chat|Free|https://chat.deepseek.com/|coding,reasoning,assistant|purposes=study,coding,research
13|Qwen Chat|Chat|Free|https://chat.qwen.ai/|assistant,coding|
14|Kimi|Chat|Freemium|https://www.kimi.com/|documents,assistant,research|
15|Character AI|Chat|Freemium|https://character.ai/|characters,conversation|
16|Chatsonic|Chat|Freemium|https://writesonic.com/chat|assistant,writing|
17|Andi|Chat|Free|https://andisearch.com/|search,assistant|
18|Phind|Chat|Freemium|https://www.phind.com/|developer,search,coding|purposes=coding,research
19|GitHub Copilot|Coding|Paid|https://github.com/features/copilot|github,programming,developer|rating=4.8;reviews=980;icon=fa-brands fa-github;trending;student;level=intermediate
20|Cursor|Coding|Freemium|https://www.cursor.com/|editor,coding,developer|trending;student;level=intermediate
21|Replit|Coding|Freemium|https://replit.com/|programming,browser,student|new;student
22|Windsurf|Coding|Freemium|https://windsurf.com/|ide,agent,developer|trending;new
23|Tabnine|Coding|Freemium|https://www.tabnine.com/|autocomplete,developer|
24|Sourcegraph Cody|Coding|Freemium|https://sourcegraph.com/cody|codebase,developer|
25|Amazon Q Developer|Coding|Freemium|https://aws.amazon.com/q/developer/|amazon,aws,developer|
26|JetBrains AI|Coding|Paid|https://www.jetbrains.com/ai/|jetbrains,ide,developer|
27|Blackbox AI|Coding|Freemium|https://www.blackbox.ai/|coding,programming|
28|v0|Coding|Freemium|https://v0.dev/|frontend,website,ui|trending;new
29|Bolt.new|Coding|Freemium|https://bolt.new/|website,app,fullstack|trending;new
30|Lovable|Coding|Freemium|https://lovable.dev/|website,app,nocode|trending;new
31|CodeRabbit|Coding|Freemium|https://www.coderabbit.ai/|code-review,github|
32|Qodo|Coding|Freemium|https://www.qodo.ai/|testing,code-quality|
33|Continue|Coding|Free|https://www.continue.dev/|opensource,ide|
34|Aider|Coding|Free|https://aider.chat/|terminal,opensource|level=advanced
35|Devin|Coding|Paid|https://devin.ai/|agent,software-engineer|trending;level=advanced
36|Codeium|Coding|Freemium|https://codeium.com/|autocomplete,developer|
37|AskCodi|Coding|Freemium|https://www.askcodi.com/|coding,assistant|
38|Mutable AI|Coding|Paid|https://mutable.ai/|developer,automation|
39|Midjourney|Image|Paid|https://www.midjourney.com/|art,design,generator|rating=4.9;icon=fa-solid fa-palette;trending
40|Adobe Firefly|Image|Freemium|https://firefly.adobe.com/|adobe,design,generator|trending
41|Leonardo AI|Image|Freemium|https://leonardo.ai/|art,generator,design|trending
42|Ideogram|Image|Freemium|https://ideogram.ai/|poster,text-image,design|new
43|Playground AI|Image|Freemium|https://playground.com/|generator,design|
44|NightCafe|Image|Freemium|https://nightcafe.studio/|art,generator|
45|DreamStudio|Image|Paid|https://dreamstudio.ai/|stable-diffusion,generator|
46|Clipdrop|Image|Freemium|https://clipdrop.co/|editing,background,upscale|
47|Remove.bg|Image|Freemium|https://www.remove.bg/|background-remover,photo,student|student
48|Freepik AI|Image|Freemium|https://www.freepik.com/ai|design,graphics,generator|
49|Canva AI|Image|Freemium|https://www.canva.com/ai-assistant/|design,presentation,student|student;purposes=image,design,presentation,study
50|Microsoft Designer|Image|Freemium|https://designer.microsoft.com/|microsoft,graphics,design|
51|Krea|Image|Freemium|https://www.krea.ai/|realtime,generator|trending
52|Recraft|Image|Freemium|https://www.recraft.ai/|vector,design,illustration|new
53|Pixlr|Image|Freemium|https://pixlr.com/|photo-editor,design|
54|Fotor AI|Image|Freemium|https://www.fotor.com/ai-image-generator/|photo,generator,editing|
55|Picsart AI|Image|Freemium|https://picsart.com/ai-tools/|photo,design,editing|
56|PhotoRoom|Image|Freemium|https://www.photoroom.com/|background,product,photo|
57|Magnific AI|Image|Paid|https://magnific.ai/|upscale,enhance|
58|Artbreeder|Image|Freemium|https://www.artbreeder.com/|art,creative|
59|Craiyon|Image|Freemium|https://www.craiyon.com/|generator,art|
60|SeaArt AI|Image|Freemium|https://www.seaart.ai/|generator,design|
61|Runway|Video|Freemium|https://runwayml.com/|generator,editing|rating=4.7;icon=fa-solid fa-film;trending
62|Pika|Video|Freemium|https://pika.art/|generator,animation|trending
63|Synthesia|Video|Paid|https://www.synthesia.io/|avatar,business,presentation|
64|HeyGen|Video|Freemium|https://www.heygen.com/|avatar,translation|trending
65|Luma Dream Machine|Video|Freemium|https://lumalabs.ai/dream-machine|generator,cinematic|trending
66|Kling AI|Video|Freemium|https://klingai.com/|generator,animation|trending;new
67|InVideo AI|Video|Freemium|https://invideo.io/ai/|youtube,generator,editing|
68|VEED AI|Video|Freemium|https://www.veed.io/tools/ai|editing,subtitles|
69|Descript|Video|Freemium|https://www.descript.com/|editing,podcast,transcription|
70|OpusClip|Video|Freemium|https://www.opus.pro/|clips,shorts|
71|Captions|Video|Freemium|https://www.captions.ai/|creator,captions|
72|Fliki|Video|Freemium|https://fliki.ai/|text-to-video,voice|
73|Colossyan|Video|Paid|https://www.colossyan.com/|avatar,training|
74|Elai.io|Video|Paid|https://elai.io/|avatar,presentation|
75|D-ID|Video|Freemium|https://www.d-id.com/|avatar,talking-photo|
76|Tavus|Video|Paid|https://www.tavus.io/|personalized-video,avatar|
77|Wisecut|Video|Freemium|https://www.wisecut.ai/|editing,short-video|
78|Kapwing AI|Video|Freemium|https://www.kapwing.com/ai|editing,creator|
79|ElevenLabs|Audio|Freemium|https://elevenlabs.io/|voice,speech,tts|rating=4.8;trending
80|Suno|Audio|Freemium|https://suno.com/|music,song|trending
81|Udio|Audio|Freemium|https://www.udio.com/|music,song|trending
82|Murf AI|Audio|Freemium|https://murf.ai/|voiceover,speech|
83|Speechify|Audio|Freemium|https://speechify.com/|tts,reading,student|student
84|PlayHT|Audio|Freemium|https://play.ht/|voice,speech|
85|Resemble AI|Audio|Paid|https://www.resemble.ai/|voice,speech|
86|LOVO AI|Audio|Freemium|https://lovo.ai/|voiceover,speech|
87|Soundraw|Audio|Paid|https://soundraw.io/|music,generator|
88|Mubert|Audio|Freemium|https://mubert.com/|music,generator|
89|Boomy|Audio|Freemium|https://boomy.com/|music,song|
90|AIVA|Audio|Freemium|https://www.aiva.ai/|composer,music|
91|Krisp|Audio|Freemium|https://krisp.ai/|noise-cancellation,meeting|
92|Adobe Podcast|Audio|Freemium|https://podcast.adobe.com/|podcast,enhance|
93|Cleanvoice|Audio|Freemium|https://cleanvoice.ai/|podcast,editing|
94|Voicemod|Audio|Freemium|https://www.voicemod.net/|voice,sound|
95|Moises|Audio|Freemium|https://moises.ai/|music,stem-separation|
96|LALAL.AI|Audio|Freemium|https://www.lalal.ai/|vocals,audio-separation|
97|Podcastle|Audio|Freemium|https://podcastle.ai/|podcast,voice|
98|Grammarly|Writing|Freemium|https://www.grammarly.com/|grammar,student,email|student
99|QuillBot|Writing|Freemium|https://quillbot.com/|paraphrase,grammar,student|student
100|Jasper|Writing|Paid|https://www.jasper.ai/|marketing,business|
101|Copy.ai|Writing|Freemium|https://www.copy.ai/|copywriting,marketing|
102|Writesonic|Writing|Freemium|https://writesonic.com/|content,blog,marketing|
103|Rytr|Writing|Freemium|https://rytr.me/|copywriting,content|
104|Wordtune|Writing|Freemium|https://www.wordtune.com/|rewrite,grammar,student|student
105|Sudowrite|Writing|Paid|https://www.sudowrite.com/|creative-writing,story|
106|Jenni AI|Writing|Freemium|https://jenni.ai/|academic,student,essay|student
107|HyperWrite|Writing|Freemium|https://www.hyperwriteai.com/|assistant,writing|
108|Anyword|Writing|Paid|https://anyword.com/|marketing,copywriting|
109|Writer|Writing|Paid|https://writer.com/|enterprise,business|
110|ProWritingAid|Writing|Freemium|https://prowritingaid.com/|grammar,editing|
111|Perplexity|Research|Freemium|https://www.perplexity.ai/|search,sources,student|trending
112|NotebookLM|Research|Free|https://notebooklm.google.com/|notes,documents,student|rating=4.8;icon=fa-solid fa-book-open;trending;new;student
113|Consensus|Research|Freemium|https://consensus.app/|papers,academic,student|student
114|Elicit|Research|Freemium|https://elicit.com/|papers,literature-review|student
115|Scite|Research|Freemium|https://scite.ai/|citations,papers|student
116|Semantic Scholar|Research|Free|https://www.semanticscholar.org/|papers,academic|student
117|Connected Papers|Research|Freemium|https://www.connectedpapers.com/|papers,visual-research|student
118|ResearchRabbit|Research|Free|https://www.researchrabbit.ai/|papers,academic|student
119|SciSpace|Research|Freemium|https://scispace.com/|pdf,papers,academic|student
120|Scholarcy|Research|Freemium|https://www.scholarcy.com/|summary,papers|student
121|Humata|Research|Freemium|https://www.humata.ai/|pdf,documents|student
122|Explainpaper|Research|Freemium|https://www.explainpaper.com/|paper,explain|student
123|Litmaps|Research|Freemium|https://www.litmaps.com/|literature-review,papers|student
124|WolframAlpha|Research|Freemium|https://www.wolframalpha.com/|math,science,student|student
125|Notion AI|Productivity|Paid|https://www.notion.so/product/ai|notes,student,writing|student
126|Gamma|Productivity|Freemium|https://gamma.app/|presentation,slides,student|trending;student;purposes=presentation,study,business
127|Otter.ai|Productivity|Freemium|https://otter.ai/|meeting,transcription,notes|
128|Fireflies.ai|Productivity|Freemium|https://fireflies.ai/|meeting,notes,transcription|
129|Fathom|Productivity|Free|https://fathom.video/|meeting,notes|
130|tl;dv|Productivity|Freemium|https://tldv.io/|meeting,transcription|
131|Taskade|Productivity|Freemium|https://www.taskade.com/|tasks,agents,team|
132|ClickUp Brain|Productivity|Paid|https://clickup.com/brain|project,tasks|
133|Motion|Productivity|Paid|https://www.usemotion.com/|calendar,planning|
134|Reclaim AI|Productivity|Freemium|https://reclaim.ai/|calendar,schedule|
135|Zapier AI|Productivity|Freemium|https://zapier.com/ai|automation,workflow|
136|Airtable AI|Productivity|Paid|https://www.airtable.com/platform/ai|database,workflow|
137|Coda AI|Productivity|Paid|https://coda.io/product/ai|documents,automation|
138|Slack AI|Productivity|Paid|https://slack.com/features/ai|team,messages|
139|Zoom AI Companion|Productivity|Freemium|https://www.zoom.com/en/products/ai-assistant/|meeting,summary|
140|Microsoft 365 Copilot|Productivity|Paid|https://www.microsoft.com/microsoft-365/copilot|word,excel,powerpoint|purposes=business,presentation,writing
141|Beautiful.ai|Productivity|Paid|https://www.beautiful.ai/|presentation,slides|student
142|SlidesAI|Productivity|Freemium|https://www.slidesai.io/|presentation,google-slides,student|student
143|Decktopus|Productivity|Freemium|https://www.decktopus.com/|presentation,slides|
144|Napkin AI|Productivity|Freemium|https://www.napkin.ai/|diagram,presentation|new
145|Whimsical AI|Productivity|Freemium|https://whimsical.com/ai|diagram,flowchart,mindmap|student
146|Miro AI|Productivity|Freemium|https://miro.com/ai/|whiteboard,diagram|
147|Framer AI|Productivity|Freemium|https://www.framer.com/ai/|website,design|
148|Durable|Productivity|Paid|https://durable.co/|website,business|
149|Wix AI|Productivity|Freemium|https://www.wix.com/ai-website-builder|website,design|
150|Bardeen|Productivity|Freemium|https://www.bardeen.ai/|automation,browser|
151|Lindy|Productivity|Freemium|https://www.lindy.ai/|agent,automation|new
152|Gumloop|Productivity|Freemium|https://www.gumloop.com/|automation,workflow|new
153|Duck.ai|Chat|Free|https://duck.ai/|privacy,assistant,chat|
154|Brave Leo|Chat|Freemium|https://brave.com/leo/|browser,assistant,privacy|
155|Monica|Chat|Freemium|https://monica.im/|assistant,browser,writing|
156|Merlin|Chat|Freemium|https://www.getmerlin.in/|browser,assistant,productivity|
157|Sider|Chat|Freemium|https://sider.ai/|browser,assistant,pdf|
158|HIX Chat|Chat|Freemium|https://hix.ai/chat|assistant,search,writing|
159|MaxAI|Chat|Freemium|https://www.maxai.co/|browser,assistant,writing|
160|Genspark|Chat|Freemium|https://www.genspark.ai/|agent,research,workspace|trending;new
161|Manus|Chat|Freemium|https://manus.im/|agent,automation,research|trending;new
162|Flowith|Chat|Freemium|https://flowith.io/|agent,canvas,research|new
163|Felo|Chat|Freemium|https://felo.ai/|search,research,assistant|
164|Claude Code|Coding|Paid|https://www.anthropic.com/claude-code|anthropic,terminal,agent|trending;new;level=advanced
165|Augment Code|Coding|Paid|https://www.augmentcode.com/|codebase,developer,agent|new;level=intermediate
166|Pieces for Developers|Coding|Freemium|https://pieces.app/|developer,snippets,copilot|
167|Supermaven|Coding|Freemium|https://supermaven.com/|autocomplete,developer,ide|
168|Warp|Coding|Freemium|https://www.warp.dev/|terminal,agent,developer|new
169|Zed AI|Coding|Freemium|https://zed.dev/ai|editor,developer,assistant|
170|GitLab Duo|Coding|Paid|https://about.gitlab.com/gitlab-duo/|gitlab,developer,devops|
171|Gemini Code Assist|Coding|Freemium|https://codeassist.google/|google,developer,coding|student
172|OpenAI Codex|Coding|Freemium|https://openai.com/codex/|coding,agent,developer|trending;new
173|Firebase Studio|Coding|Freemium|https://firebase.studio/|google,app-builder,developer|new
174|Databutton|Coding|Freemium|https://databutton.com/|app-builder,python,fullstack|
175|Base44|Coding|Freemium|https://base44.com/|app-builder,no-code,fullstack|new
176|Softgen|Coding|Freemium|https://softgen.ai/|app-builder,website,coding|new
177|Tempo Labs|Coding|Freemium|https://www.tempo.new/|frontend,app-builder,react|new
178|OpenArt|Image|Freemium|https://openart.ai/|generator,art,models|
179|Mage.Space|Image|Freemium|https://www.mage.space/|generator,stable-diffusion|
180|Tensor.Art|Image|Freemium|https://tensor.art/|models,generator,art|
181|getimg.ai|Image|Freemium|https://getimg.ai/|generator,editing,image|
182|Pixelcut|Image|Freemium|https://www.pixelcut.ai/|photo,product,editing|
183|Pebblely|Image|Freemium|https://pebblely.com/|product,photo,background|
184|Cleanup.pictures|Image|Freemium|https://cleanup.pictures/|remove-object,photo,editing|
185|Upscale.media|Image|Freemium|https://www.upscale.media/|upscale,enhance,photo|
186|Let's Enhance|Image|Freemium|https://letsenhance.io/|upscale,photo,enhance|
187|LogoAI|Image|Paid|https://www.logoai.com/|logo,branding,design|
188|Looka|Image|Paid|https://looka.com/|logo,branding,design|
189|Cutout.Pro|Image|Freemium|https://www.cutout.pro/|background,photo,video|
190|VanceAI|Image|Freemium|https://vanceai.com/|enhance,upscale,photo|
191|insMind|Image|Freemium|https://www.insmind.com/|product-photo,background,design|
192|Vidu|Video|Freemium|https://www.vidu.com/|generator,video,creative|new
193|Hailuo AI|Video|Freemium|https://hailuoai.video/|generator,cinematic,video|new
194|PixVerse|Video|Freemium|https://pixverse.ai/|generator,animation,video|new
195|Haiper|Video|Freemium|https://haiper.ai/|generator,video,animation|
196|Hedra|Video|Freemium|https://www.hedra.com/|character,avatar,video|new
197|Viggle|Video|Freemium|https://viggle.ai/|animation,character,video|
198|Topaz Video AI|Video|Paid|https://www.topazlabs.com/topaz-video-ai|upscale,enhance,video|
199|Filmora AI|Video|Paid|https://filmora.wondershare.com/ai-features.html|editing,video,creator|
200|FlexClip AI|Video|Freemium|https://www.flexclip.com/ai/|editing,video,generator|
201|Steve AI|Video|Freemium|https://www.steve.ai/|animation,video,text-to-video|
202|Kits AI|Audio|Freemium|https://www.kits.ai/|voice,music,creator|
203|Soundful|Audio|Freemium|https://soundful.com/|music,generator,creator|
204|Beatoven.ai|Audio|Freemium|https://www.beatoven.ai/|music,background-music,creator|
205|LANDR|Audio|Paid|https://www.landr.com/|mastering,music,audio|
206|Auphonic|Audio|Freemium|https://auphonic.com/|audio,podcast,enhance|
207|NaturalReader|Audio|Freemium|https://www.naturalreaders.com/|tts,reading,student|student
208|Voicemaker|Audio|Freemium|https://voicemaker.in/|tts,voice,speech|
209|Frase|Writing|Paid|https://www.frase.io/|seo,content,writing|
210|Surfer AI|Writing|Paid|https://surferseo.com/ai/|seo,content,writing|
211|TextCortex|Writing|Freemium|https://textcortex.com/|writing,assistant,rewrite|
212|Lex|Writing|Freemium|https://lex.page/|writing,editor,documents|
213|Type.ai|Writing|Freemium|https://type.ai/|writing,documents,assistant|
214|LanguageTool|Writing|Freemium|https://languagetool.org/|grammar,writing,language|
215|DeepL Write|Writing|Freemium|https://www.deepl.com/write|rewrite,grammar,language|
216|Afforai|Research|Freemium|https://afforai.com/|research,documents,citations|student
217|Unriddle|Research|Freemium|https://www.unriddle.ai/|documents,research,student|student
218|Julius AI|Research|Freemium|https://julius.ai/|data,analysis,research|student
219|ChatPDF|Research|Freemium|https://www.chatpdf.com/|pdf,documents,student|student
220|AskYourPDF|Research|Freemium|https://askyourpdf.com/|pdf,documents,research|student
221|PDF.ai|Research|Freemium|https://pdf.ai/|pdf,documents,chat|student
222|Glasp|Research|Freemium|https://glasp.co/|highlight,summary,research|student
223|Recall|Research|Freemium|https://www.getrecall.ai/|knowledge,summary,research|student
224|Mapify|Research|Freemium|https://mapify.so/|mindmap,summary,research|student
225|Make|Productivity|Freemium|https://www.make.com/|automation,workflow,business|
226|n8n|Productivity|Freemium|https://n8n.io/|automation,workflow,agents|
227|Relay.app|Productivity|Freemium|https://www.relay.app/|automation,workflow,agents|
228|Rows AI|Productivity|Freemium|https://rows.com/ai|spreadsheet,data,productivity|
229|Browse AI|Productivity|Freemium|https://www.browse.ai/|web-scraping,automation,data|
230|Mem|Productivity|Freemium|https://mem.ai/|notes,knowledge,productivity|
231|Granola|Productivity|Freemium|https://www.granola.ai/|meeting,notes,productivity|new
232|Read AI|Productivity|Freemium|https://www.read.ai/|meeting,summary,productivity|
233|Tactiq|Productivity|Freemium|https://tactiq.io/|meeting,transcription,notes|
234|Fyxer AI|Productivity|Paid|https://www.fyxer.com/|email,meeting,assistant|new
`;


/* =====================================================
CONVERT TOOL DATABASE
===================================================== */

const rawTools = TOOL_DATA
    .trim()
    .split("\n")
    .map(line => {

        const [
            id,
            name,
            category,
            pricing,
            url,
            tagsText,
            optText = ""
        ] = line.split("|");


        const tool = {
            id: Number(id),
            name,
            category,
            pricing,
            url,
            tags: tagsText
                ? tagsText.split(",")
                : []
        };


        optText
            .split(";")
            .filter(Boolean)
            .forEach(part => {

                if (
                    part === "trending" ||
                    part === "new" ||
                    part === "student"
                ) {

                    tool[part] = true;
                    return;

                }


                const index =
                    part.indexOf("=");


                if (index < 0) {
                    return;
                }


                const key =
                    part.slice(0, index);


                const value =
                    part.slice(index + 1);


                if (key === "rating") {

                    tool.rating =
                        Number(value);

                }

                else if (
                    key === "purposes"
                ) {

                    tool.purposes =
                        value
                            ? value.split(",")
                            : [];

                }

                else {

                    tool[key] =
                        value;

                }

            });


        return tool;

    });


const tools =
    rawTools.map(tool => ({

        ...tool,

        rating:
            tool.rating || 4.6,

        reviews:
            tool.reviews || "500+",

        icon:
            tool.icon ||
            getCategoryIcon(
                tool.category
            ),

        description:
            tool.description ||
            categoryDescriptions[
                tool.category
            ],

        purposes:
            tool.purposes ||
            categoryPurposes[
                tool.category
            ] ||
            [],

        level:
            tool.level ||
            "beginner",

        trending:
            tool.trending ||
            false,

        new:
            tool.new ||
            false,

        student:
            tool.student ||
            false,

        pros:
            tool.pros || [
                "Useful AI-powered features",
                "Simple online access",
                "Can improve productivity"
            ],

        cons:
            tool.cons || [
                "Some advanced features may require a paid plan"
            ],

        tags: [
            tool.name.toLowerCase(),
            tool.category.toLowerCase(),
            ...(tool.tags || [])
        ]

    }));


/* =====================================================
PAGE CHECK
===================================================== */

const isExplorePage =
    document.body.dataset.page === "explore"
    ||
    /(^|\/)explore\.html$/i.test(
        location.pathname
    );


const HOME_PREVIEW_LIMIT = 12;


/* =====================================================
STATE
===================================================== */

let currentCategory =
    "All";

let currentPricing =
    "All";

let currentSearch =
    "";

let currentSort =
    "recommended";


let favorites =
    JSON.parse(
        localStorage.getItem(
            "aiVaultFavorites"
        ) || "[]"
    );


/* =====================================================
ELEMENTS
===================================================== */

const $ =
    id =>
        document.getElementById(id);


const toolGrid =
    $("toolGrid");


const favoritesGrid =
    $("favoritesGrid");


/*
HOME PAGE:
searchInput

EXPLORE PAGE:
mainSearch

This supports BOTH.
*/

const mainSearch =
    $("mainSearch")
    ||
    $("searchInput");


const categoryFilters =
    document.querySelectorAll(
        ".filter"
    );


const pricingFilter =
    $("pricingFilter");


const sortFilter =
    $("sortFilter");


const resultsCount =
    $("resultsCount");


const noResults =
    $("noResults");


const savedCount =
    $("savedCount");


const favoritesEmpty =
    $("favoritesEmpty");


/* =====================================================
HELPER
===================================================== */

function capitalize(text) {

    text =
        String(
            text || ""
        );


    return (
        text.charAt(0).toUpperCase()
        +
        text.slice(1)
    );

}


/* =====================================================
SMART SEARCH
===================================================== */

function normalizeSearchText(text) {

    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /[^a-z0-9]/g,
            ""
        );

}


function getSearchableText(tool) {

    return `

        ${tool.name}

        ${tool.category}

        ${tool.description}

        ${tool.pricing}

        ${(tool.tags || []).join(" ")}

        ${(tool.purposes || []).join(" ")}

    `.toLowerCase();

}


function toolMatchesSearch(
    tool,
    query
) {

    const q =
        String(query || "")
            .trim()
            .toLowerCase();


    if (!q) {
        return true;
    }


    const normalText =
        getSearchableText(tool);


    const compactText =
        normalizeSearchText(
            normalText
        );


    const compactQuery =
        normalizeSearchText(
            q
        );


    /*
    Normal search
    */

    if (
        normalText.includes(q)
    ) {

        return true;

    }


    /*
    chat gpt -> chatgpt
    */

    if (
        compactQuery
        &&
        compactText.includes(
            compactQuery
        )
    ) {

        return true;

    }


    /*
    Multiple word search
    */

    const words =
        q
            .split(/\s+/)
            .filter(Boolean);


    if (
        words.length > 1
    ) {

        return words.every(
            word => {

                const compactWord =
                    normalizeSearchText(
                        word
                    );


                return (
                    normalText.includes(
                        word
                    )
                    ||
                    (
                        compactWord
                        &&
                        compactText.includes(
                            compactWord
                        )
                    )
                );

            }
        );

    }


    return false;

}


/* =====================================================
CREATE TOOL CARD
===================================================== */

function createToolCard(tool) {

    const saved =
        favorites.includes(
            tool.id
        );


    let badges = "";


    if (tool.trending) {

        badges +=
            '<span class="tool-badge badge-trending">TRENDING</span>';

    }


    if (tool.new) {

        badges +=
            '<span class="tool-badge badge-new">NEW</span>';

    }


    if (tool.student) {

        badges +=
            '<span class="tool-badge badge-student">STUDENT</span>';

    }


    const pricingClass =
        tool.pricing
            .toLowerCase();


    return `

        <article
            class="tool-card"
            data-id="${tool.id}"
        >

            <div class="tool-badges">
                ${badges}
            </div>


            <div class="tool-top">

                <div class="tool-icon">

                    <i
                        class="${tool.icon}"
                    ></i>

                </div>


                <button

                    class="
                        bookmark-button
                        ${saved ? "saved" : ""}
                    "

                    onclick="
                        toggleFavorite(
                            ${tool.id}
                        )
                    "

                    aria-label="
                        Save ${tool.name}
                    "

                >

                    <i
                        class="
                            ${saved ? "fa-solid" : "fa-regular"}
                            fa-bookmark
                        "
                    ></i>

                </button>

            </div>


            <div class="tool-info">

                <div class="tool-name-row">

                    <h3>
                        ${tool.name}
                    </h3>


                    <span class="verified">

                        <i
                            class="
                                fa-solid
                                fa-check
                            "
                        ></i>

                    </span>

                </div>


                <p class="tool-description">

                    ${tool.description}

                </p>

            </div>


            <div class="tool-tags">

                ${
                    (tool.tags || [])
                        .slice(0, 3)
                        .map(
                            tag => `
                                <span class="tool-tag">
                                    ${tag}
                                </span>
                            `
                        )
                        .join("")
                }

            </div>


            <div class="tool-meta">

                <div class="rating">

                    <i
                        class="
                            fa-solid
                            fa-star
                        "
                    ></i>

                    <strong>
                        ${tool.rating}
                    </strong>

                    <span>
                        (${tool.reviews})
                    </span>

                </div>


                <span
                    class="
                        pricing
                        price-${pricingClass}
                    "
                >

                    ${tool.pricing}

                </span>

            </div>


            <div class="tool-actions">

                <button

                    class="details-button"

                    onclick="
                        openToolDetails(
                            ${tool.id}
                        )
                    "

                >

                    View details

                </button>


                <button

                    class="
                        visit-tool-button
                    "

                    onclick="
                        visitTool(
                            '${tool.url}'
                        )
                    "

                    aria-label="
                        Visit ${tool.name}
                    "

                >

                    <i
                        class="
                            fa-solid
                            fa-arrow-up-right-from-square
                        "
                    ></i>

                </button>

            </div>

        </article>

    `;

}


/* =====================================================
FILTER TOOLS
===================================================== */

function getFilteredTools() {

    let filtered =
        tools.filter(
            tool => {

                const matchesSearch =
                    toolMatchesSearch(
                        tool,
                        currentSearch
                    );


                const matchesCategory =
                    currentCategory === "All"
                    ||
                    tool.category ===
                        currentCategory;


                const matchesPricing =
                    currentPricing === "All"
                    ||
                    tool.pricing ===
                        currentPricing;


                return (
                    matchesSearch
                    &&
                    matchesCategory
                    &&
                    matchesPricing
                );

            }
        );


    if (
        currentSort === "rating"
    ) {

        filtered.sort(
            (a, b) =>
                b.rating -
                a.rating
        );

    }


    else if (
        currentSort === "name"
    ) {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name,
                    undefined,
                    {
                        sensitivity:
                            "base"
                    }
                )
        );

    }


    return filtered;

}


/* =====================================================
RENDER TOOLS
===================================================== */

function renderTools() {

    if (!toolGrid) {
        return;
    }


    const filtered =
        getFilteredTools();


    const visible =
        isExplorePage
            ? filtered
            : filtered.slice(
                0,
                HOME_PREVIEW_LIMIT
            );


    toolGrid.innerHTML =
        visible
            .map(
                createToolCard
            )
            .join("");


    if (resultsCount) {

        resultsCount.textContent =
            isExplorePage
                ? `${filtered.length} tools`
                : `Showing ${visible.length} of ${filtered.length} tools`;

    }


    if (noResults) {

        noResults.style.display =
            filtered.length
                ? "none"
                : "block";

    }


    updateExploreButton(
        filtered.length
    );


    animateToolCards();

}


/* =====================================================
HOME EXPLORE ALL BUTTON
===================================================== */

function updateExploreButton(
    matchCount
) {

    if (
        isExplorePage
        ||
        !toolGrid
    ) {

        return;

    }


    let wrapper =
        $("exploreAllWrap");


    if (!wrapper) {

        wrapper =
            document.createElement(
                "div"
            );


        wrapper.id =
            "exploreAllWrap";


        wrapper.style.cssText =
            "display:flex;justify-content:center;align-items:center;margin-top:38px;";


        toolGrid
            .insertAdjacentElement(
                "afterend",
                wrapper
            );

    }


    const params =
        new URLSearchParams();


    if (currentSearch) {

        params.set(
            "search",
            currentSearch
        );

    }


    if (
        currentCategory !== "All"
    ) {

        params.set(
            "category",
            currentCategory
        );

    }


    if (
        currentPricing !== "All"
    ) {

        params.set(
            "pricing",
            currentPricing
        );

    }


    const query =
        params.toString()
            ? `?${params.toString()}`
            : "";


    const countText =
        currentSearch
            ? ` (${matchCount})`
            : "";


    wrapper.innerHTML = `

        <a

            href="
                explore.html${query}
            "

            class="
                primary-button
            "

            style="
                text-decoration:none;
                display:inline-flex;
                align-items:center;
                gap:10px;
            "

        >

            Explore All AI Tools${countText}

            <i
                class="
                    fa-solid
                    fa-arrow-right
                "
            ></i>

        </a>

    `;

}


/* =====================================================
SEARCH
===================================================== */

if (mainSearch) {

    mainSearch.addEventListener(
        "input",
        function () {

            currentSearch =
                mainSearch
                    .value
                    .trim();


            /*
            Searching resets category,
            so ChatGPT is not hidden
            by a previous category filter.
            */

            if (currentSearch) {

                currentCategory =
                    "All";


                resetCategoryButtons();

            }


            renderTools();


            if (
                !isExplorePage
                &&
                currentSearch
                &&
                toolGrid
            ) {

                toolGrid.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }

        }
    );


    mainSearch.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
                &&
                !isExplorePage
            ) {

                const value =
                    mainSearch
                        .value
                        .trim();


                if (value) {

                    location.href =
                        `explore.html?search=${
                            encodeURIComponent(
                                value
                            )
                        }`;

                }

            }

        }
    );

}


/* =====================================================
QUICK SEARCH
===================================================== */

document
    .querySelectorAll(
        ".quick-search"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const search =
                        button
                            .dataset
                            .search
                        || "";


                    currentSearch =
                        search;


                    currentCategory =
                        "All";


                    resetCategoryButtons();


                    if (mainSearch) {

                        mainSearch.value =
                            search;

                    }


                    renderTools();


                    if (toolGrid) {

                        toolGrid.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }

                }
            );

        }
    );


/* =====================================================
CATEGORY FILTERS
===================================================== */

categoryFilters.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                categoryFilters
                    .forEach(
                        item =>
                            item
                                .classList
                                .remove(
                                    "active"
                                )
                    );


                button
                    .classList
                    .add(
                        "active"
                    );


                currentCategory =
                    button
                        .dataset
                        .category
                    || "All";


                currentSearch =
                    "";


                if (mainSearch) {

                    mainSearch.value =
                        "";

                }


                renderTools();

            }
        );

    }
);


function resetCategoryButtons() {

    categoryFilters
        .forEach(
            button => {

                button
                    .classList
                    .remove(
                        "active"
                    );


                if (
                    button
                        .dataset
                        .category ===
                    "All"
                ) {

                    button
                        .classList
                        .add(
                            "active"
                        );

                }

            }
        );

}


/* =====================================================
CATEGORY CARDS
===================================================== */

document
    .querySelectorAll(
        ".category-card"
    )
    .forEach(
        card => {

            card.addEventListener(
                "click",
                function () {

                    const category =
                        card
                            .dataset
                            .category;


                    if (!category) {
                        return;
                    }


                    if (!isExplorePage) {

                        location.href =
                            `explore.html?category=${
                                encodeURIComponent(
                                    category
                                )
                            }`;

                        return;

                    }


                    currentCategory =
                        category;


                    currentSearch =
                        "";


                    if (mainSearch) {

                        mainSearch.value =
                            "";

                    }


                    categoryFilters
                        .forEach(
                            button => {

                                button
                                    .classList
                                    .toggle(

                                        "active",

                                        button
                                            .dataset
                                            .category ===
                                            category

                                    );

                            }
                        );


                    renderTools();


                    if (toolGrid) {

                        toolGrid
                            .scrollIntoView({

                                behavior:
                                    "smooth"

                            });

                    }

                }
            );

        }
    );


/* =====================================================
PRICING FILTER
===================================================== */

if (pricingFilter) {

    pricingFilter
        .addEventListener(
            "change",
            function () {

                currentPricing =
                    pricingFilter
                        .value;


                renderTools();

            }
        );

}


/* =====================================================
SORT FILTER
===================================================== */

if (sortFilter) {

    sortFilter
        .addEventListener(
            "change",
            function () {

                currentSort =
                    sortFilter
                        .value;


                renderTools();

            }
        );

}


/* =====================================================
RESET FILTERS
===================================================== */

const resetFiltersButton =
    $("resetFilters");


if (resetFiltersButton) {

    resetFiltersButton
        .addEventListener(
            "click",
            resetAllFilters
        );

}


function resetAllFilters() {

    currentSearch =
        "";

    currentCategory =
        "All";

    currentPricing =
        "All";

    currentSort =
        "recommended";


    if (mainSearch) {

        mainSearch.value =
            "";

    }


    if (pricingFilter) {

        pricingFilter.value =
            "All";

    }


    if (sortFilter) {

        sortFilter.value =
            "recommended";

    }


    resetCategoryButtons();


    renderTools();

}


/* =====================================================
URL SEARCH / FILTER
===================================================== */

function applyIncomingFilters() {

    if (!isExplorePage) {
        return;
    }


    const params =
        new URLSearchParams(
            location.search
        );


    const search =
        params.get(
            "search"
        );


    const category =
        params.get(
            "category"
        );


    const pricing =
        params.get(
            "pricing"
        );


    if (search) {

        currentSearch =
            search;


        if (mainSearch) {

            mainSearch.value =
                search;

        }

    }


    if (
        category
        &&
        tools.some(
            tool =>
                tool.category ===
                category
        )
    ) {

        currentCategory =
            category;


        categoryFilters
            .forEach(
                button => {

                    button
                        .classList
                        .toggle(

                            "active",

                            button
                                .dataset
                                .category ===
                                category

                        );

                }
            );

    }


    if (
        pricing
        &&
        [
            "All",
            "Free",
            "Freemium",
            "Paid"
        ]
        .includes(
            pricing
        )
    ) {

        currentPricing =
            pricing;


        if (pricingFilter) {

            pricingFilter.value =
                pricing;

        }

    }

}


/* =====================================================
FAVORITES
===================================================== */

function toggleFavorite(id) {

    if (
        favorites.includes(id)
    ) {

        favorites =
            favorites.filter(
                item =>
                    item !== id
            );


        showToast(
            "Removed from saved tools"
        );

    }

    else {

        favorites.push(id);


        showToast(
            "Saved to My Tools"
        );

    }


    localStorage.setItem(

        "aiVaultFavorites",

        JSON.stringify(
            favorites
        )

    );


    updateFavorites();


    renderTools();

}


/* =====================================================
UPDATE FAVORITES
===================================================== */

function updateFavorites() {

    if (savedCount) {

        savedCount.textContent =
            favorites.length;

    }


    if (!favoritesGrid) {
        return;
    }


    const savedTools =
        tools.filter(
            tool =>
                favorites.includes(
                    tool.id
                )
        );


    favoritesGrid.innerHTML =
        savedTools
            .map(
                createToolCard
            )
            .join("");


    if (favoritesEmpty) {

        favoritesEmpty.style.display =
            savedTools.length
                ? "none"
                : "block";

    }

}


/* =====================================================
SAVED BUTTON
===================================================== */

const savedNavButton =
    $("savedNavButton");


if (savedNavButton) {

    savedNavButton
        .addEventListener(
            "click",
            function () {

                const section =
                    $("favorites");


                if (section) {

                    section
                        .scrollIntoView({

                            behavior:
                                "smooth"

                        });

                }

                else {

                    location.href =
                        "explore.html#favorites";

                }

            }
        );

}


/* =====================================================
VISIT WEBSITE
===================================================== */

function visitTool(url) {

    window.open(

        url,

        "_blank",

        "noopener,noreferrer"

    );

}


/* =====================================================
TOOL DETAILS MODAL
===================================================== */

const modal =
    $("toolModal");


const modalContent =
    $("modalContent");


/* =====================================================
   OPEN FULL TOOL DETAILS PAGE
===================================================== */

function openToolDetails(id) {

    window.location.href =
        `tool-details.html?id=${id}`;

}


/* =====================================================
CLOSE MODAL
===================================================== */

function closeModal() {

    if (!modal) {
        return;
    }


    modal
        .classList
        .remove(
            "show"
        );


    document.body
        .style
        .overflow =
            "";

}


const modalClose =
    $("modalClose");


if (modalClose) {

    modalClose
        .addEventListener(
            "click",
            closeModal
        );

}


if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                modal
            ) {

                closeModal();

            }

        }
    );

}


/* =====================================================
AI FINDER
===================================================== */

const finderPurpose =
    $("finderPurpose");


const finderBudget =
    $("finderBudget");


const finderLevel =
    $("finderLevel")
    ||
    $("finderExperience");


const finderEmpty =
    $("finderEmpty");


const recommendationList =
    $("recommendationList");


const findToolsButton =
    $("findToolsButton");


if (findToolsButton) {

    findToolsButton
        .addEventListener(
            "click",
            recommendTools
        );

}


function recommendTools() {

    if (
        !finderPurpose
        ||
        !finderBudget
        ||
        !finderLevel
        ||
        !recommendationList
    ) {

        return;

    }


    const purpose =
        finderPurpose.value;


    const budget =
        finderBudget.value;


    const level =
        finderLevel.value;


    if (!purpose) {

        showToast(
            "Please select what you want to do"
        );

        return;

    }


    let recommended =
        tools.filter(
            tool =>
                (tool.purposes || [])
                    .includes(
                        purpose
                    )
        );


   if (
    budget === "freemium"
) {

    recommended =
        recommended.filter(
            tool =>
                tool.pricing === "Freemium"
        );

}

else if (
    budget === "paid"
) {

    recommended =
        recommended.filter(
            tool =>
                tool.pricing === "Paid"
        );

}


    else if (
        budget === "freemium"
    ) {

        recommended =
            recommended.filter(
                tool =>
                    tool.pricing === "Free"
                    ||
                    tool.pricing === "Freemium"
            );

    }


    else if (
        budget === "paid"
    ) {

        recommended =
            recommended.filter(
                tool =>
                    tool.pricing ===
                    "Paid"
            );

    }


    recommended.sort(
        (a, b) => {

            let scoreA =
                a.rating;


            let scoreB =
                b.rating;


            if (
                a.level === level
            ) {

                scoreA +=
                    0.3;

            }


            if (
                b.level === level
            ) {

                scoreB +=
                    0.3;

            }


            if (a.student) {

                scoreA +=
                    0.1;

            }


            if (b.student) {

                scoreB +=
                    0.1;

            }


            return (
                scoreB -
                scoreA
            );

        }
    );


    recommended =
        recommended.slice(
            0,
            5
        );


    if (finderEmpty) {

        finderEmpty.style.display =
            "none";

    }


    if (
        !recommended.length
    ) {

        recommendationList.innerHTML = `

            <div class="finder-empty">

                <i
                    class="
                        fa-solid
                        fa-magnifying-glass
                    "
                ></i>

                <h3>
                    No exact match found
                </h3>

                <p>
                    Try changing your budget
                    or experience level.
                </p>

            </div>

        `;


        return;

    }


    const medals =
        [
            "🥇",
            "🥈",
            "🥉",
            "⭐",
            "⭐"
        ];


    recommendationList.innerHTML =
        recommended
            .map(
                (
                    tool,
                    index
                ) => `

                    <div

                        class="
                            recommendation
                        "

                        onclick="
                            openToolDetails(
                                ${tool.id}
                            )
                        "

                    >

                        <div class="recommendation-rank">

                            ${medals[index]}

                        </div>


                        <div class="recommendation-info">

                            <h4>
                                ${tool.name}
                            </h4>

                            <p>
                                ${tool.description}
                            </p>

                        </div>


                        <span
                            class="
                                pricing
                                price-${tool.pricing.toLowerCase()}
                            "
                        >

                            ${tool.pricing}

                        </span>

                    </div>

                `
            )
            .join("");

}


/* =====================================================
STUDENT TOOLS
===================================================== */

const studentToolsButton =
    $("studentToolsButton");


if (studentToolsButton) {

    studentToolsButton
        .addEventListener(
            "click",
            function () {

                if (!isExplorePage) {

                    location.href =
                        "explore.html?search=student";

                    return;

                }


                currentSearch =
                    "student";


                currentCategory =
                    "All";


                resetCategoryButtons();


                if (mainSearch) {

                    mainSearch.value =
                        "student";

                }


                renderTools();


                if (toolGrid) {

                    toolGrid
                        .scrollIntoView({

                            behavior:
                                "smooth"

                        });

                }

            }
        );

}


/* =====================================================
TOOL OF DAY
===================================================== */

function renderToolOfDay() {

    const container =
        $("toolOfDay");


    if (!container) {
        return;
    }


    const tool =
        tools[
            Math.floor(
                Date.now() /
                86400000
            )
            %
            tools.length
        ];


    container.innerHTML = `

        <div class="day-tool-info">

            <span class="day-badge">
                TODAY'S PICK
            </span>


            <h3>
                ${tool.name}
            </h3>


            <p>
                ${tool.description}
            </p>


            <div>

                <button

                    class="
                        primary-button
                    "

                    onclick="
                        openToolDetails(
                            ${tool.id}
                        )
                    "

                >

                    Explore ${tool.name}

                    <i
                        class="
                            fa-solid
                            fa-arrow-right
                        "
                    ></i>

                </button>

            </div>

        </div>


        <div class="day-tool-visual">

            <div class="day-tool-icon">

                <i
                    class="${tool.icon}"
                ></i>

            </div>

        </div>

    `;

}


/* =====================================================
TRENDING
===================================================== */

function renderTrending() {

    const container =
        $("trendingGrid");


    if (!container) {
        return;
    }


    const list =
        tools
            .filter(
                tool =>
                    tool.trending
            )
            .slice(
                0,
                8
            );


    container.innerHTML =
        list
            .map(
                (
                    tool,
                    index
                ) => `

                    <div

                        class="
                            trending-item
                        "

                        onclick="
                            openToolDetails(
                                ${tool.id}
                            )
                        "

                    >

                        <span
                            class="
                                trending-rank
                            "
                        >

                            #${index + 1}

                        </span>


                        <div
                            class="
                                trending-icon
                            "
                        >

                            <i
                                class="${tool.icon}"
                            ></i>

                        </div>


                        <div
                            class="
                                trending-info
                            "
                        >

                            <h4>
                                ${tool.name}
                            </h4>

                            <span>
                                ${tool.category}
                            </span>

                        </div>


                        <i
                            class="
                                fa-solid
                                fa-arrow-trend-up
                                trending-arrow
                            "
                        ></i>

                    </div>

                `
            )
            .join("");

}


/* =====================================================
NEW TOOLS
===================================================== */

function renderNewTools() {

    const container =
        $("newToolsGrid");


    if (!container) {
        return;
    }


    container.innerHTML =
        tools
            .filter(
                tool =>
                    tool.new
            )
            .slice(
                0,
                12
            )
            .map(
                tool => `

                    <div

                        class="
                            new-tool
                        "

                        onclick="
                            openToolDetails(
                                ${tool.id}
                            )
                        "

                    >

                        <div
                            class="
                                new-tool-icon
                            "
                        >

                            <i
                                class="${tool.icon}"
                            ></i>

                        </div>


                        <div
                            class="
                                new-tool-info
                            "
                        >

                            <h4>
                                ${tool.name}
                            </h4>

                            <p>
                                ${tool.description}
                            </p>

                        </div>


                        <span
                            class="
                                tool-badge
                                badge-new
                            "
                        >

                            NEW

                        </span>

                    </div>

                `
            )
            .join("");

}


/* =====================================================
COMPARE AI - A TO Z
===================================================== */

const compareOne =
    $("compareToolOne");


const compareTwo =
    $("compareToolTwo");


const compareButton =
    $("compareButton");


function loadCompareOptions() {

    if (
        !compareOne
        ||
        !compareTwo
    ) {

        return;

    }


    const alphabeticalTools =
        [...tools]
            .sort(
                (a, b) =>
                    a.name
                        .localeCompare(
                            b.name,
                            undefined,
                            {
                                sensitivity:
                                    "base"
                            }
                        )
            );


    const options =
        alphabeticalTools
            .map(
                tool => `

                    <option
                        value="${tool.id}"
                    >

                        ${tool.name}

                    </option>

                `
            )
            .join("");


    compareOne.innerHTML =
        options;


    compareTwo.innerHTML =
        options;


    const chatGPT =
        tools.find(
            tool =>
                tool.name ===
                "ChatGPT"
        );


    const gemini =
        tools.find(
            tool =>
                tool.name ===
                "Google Gemini"
        );


    if (chatGPT) {

        compareOne.value =
            String(
                chatGPT.id
            );

    }


    if (gemini) {

        compareTwo.value =
            String(
                gemini.id
            );

    }


    compareSelectedTools();

}


if (compareButton) {

    compareButton
        .addEventListener(
            "click",
            compareSelectedTools
        );

}


/* =====================================================
COMPARE SELECTED TOOLS
===================================================== */

function compareSelectedTools() {

    const container =
        $("comparisonContainer");


    if (
        !compareOne
        ||
        !compareTwo
        ||
        !container
    ) {

        return;

    }


    const first =
        tools.find(
            tool =>
                tool.id ===
                Number(
                    compareOne.value
                )
        );


    const second =
        tools.find(
            tool =>
                tool.id ===
                Number(
                    compareTwo.value
                )
        );


    if (
        !first
        ||
        !second
    ) {

        return;

    }


    container.innerHTML = `

        <table
            class="
                comparison-table
            "
        >

            <thead>

                <tr>

                    <th>
                        Feature
                    </th>

                    <th>

                        <div
                            class="
                                compare-tool-name
                            "
                        >

                            ${first.name}

                        </div>

                    </th>

                    <th>

                        <div
                            class="
                                compare-tool-name
                            "
                        >

                            ${second.name}

                        </div>

                    </th>

                </tr>

            </thead>


            <tbody>

                <tr>

                    <td>
                        Category
                    </td>

                    <td>
                        ${first.category}
                    </td>

                    <td>
                        ${second.category}
                    </td>

                </tr>


                <tr>

                    <td>
                        Pricing
                    </td>

                    <td>
                        ${first.pricing}
                    </td>

                    <td>
                        ${second.pricing}
                    </td>

                </tr>


                <tr>

                    <td>
                        Rating
                    </td>

                    <td>
                        ⭐ ${first.rating}
                    </td>

                    <td>
                        ⭐ ${second.rating}
                    </td>

                </tr>


                <tr>

                    <td>
                        Beginner Friendly
                    </td>

                    <td>

                        ${
                            first.level ===
                            "beginner"

                                ? "✓ Yes"

                                : capitalize(
                                    first.level
                                )
                        }

                    </td>

                    <td>

                        ${
                            second.level ===
                            "beginner"

                                ? "✓ Yes"

                                : capitalize(
                                    second.level
                                )
                        }

                    </td>

                </tr>


                <tr>

                    <td>
                        Student Friendly
                    </td>

                    <td>

                        ${
                            first.student
                                ? "✓ Yes"
                                : "—"
                        }

                    </td>

                    <td>

                        ${
                            second.student
                                ? "✓ Yes"
                                : "—"
                        }

                    </td>

                </tr>


                <tr>

                    <td>
                        Best For
                    </td>

                    <td>

                        ${
                            (first.purposes || [])
                                .slice(0, 3)
                                .map(capitalize)
                                .join(", ")
                        }

                    </td>

                    <td>

                        ${
                            (second.purposes || [])
                                .slice(0, 3)
                                .map(capitalize)
                                .join(", ")
                        }

                    </td>

                </tr>

            </tbody>

        </table>

    `;

}


/* =====================================================
THEME
===================================================== */

const themeButton =
    $("themeButton");


if (
    localStorage.getItem(
        "aiVaultTheme"
    ) ===
    "light"
) {

    document.body
        .classList
        .add(
            "light-mode"
        );

}


function updateThemeIcon() {

    if (!themeButton) {
        return;
    }


    const icon =
        themeButton
            .querySelector("i");


    if (!icon) {
        return;
    }


    icon.className =
        document.body
            .classList
            .contains(
                "light-mode"
            )

            ? "fa-solid fa-moon"

            : "fa-solid fa-sun";

}


updateThemeIcon();


if (themeButton) {

    themeButton
        .addEventListener(
            "click",
            function () {

                document.body
                    .classList
                    .toggle(
                        "light-mode"
                    );


                localStorage.setItem(

                    "aiVaultTheme",

                    document.body
                        .classList
                        .contains(
                            "light-mode"
                        )

                        ? "light"

                        : "dark"

                );


                updateThemeIcon();

            }
        );

}


/* =====================================================
MOBILE MENU
===================================================== */

const menuButton =
    $("menuButton")
    ||
    $("mobileMenuButton");


const mobileMenu =
    $("mobileMenu");


if (
    menuButton
    &&
    mobileMenu
) {

    menuButton
        .addEventListener(
            "click",
            function () {

                mobileMenu
                    .classList
                    .toggle(
                        "show"
                    );


                const icon =
                    menuButton
                        .querySelector(
                            "i"
                        );


                if (icon) {

                    icon.className =
                        mobileMenu
                            .classList
                            .contains(
                                "show"
                            )

                            ? "fa-solid fa-xmark"

                            : "fa-solid fa-bars";

                }

            }
        );


    mobileMenu
        .querySelectorAll(
            "a"
        )
        .forEach(
            link => {

                link
                    .addEventListener(
                        "click",
                        function () {

                            mobileMenu
                                .classList
                                .remove(
                                    "show"
                                );

                        }
                    );

            }
        );

}


/* =====================================================
KEYBOARD SHORTCUT
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "/"
            &&
            mainSearch
            &&
            document.activeElement.tagName !==
                "INPUT"
            &&
            document.activeElement.tagName !==
                "SELECT"
            &&
            document.activeElement.tagName !==
                "TEXTAREA"
        ) {

            event.preventDefault();


            mainSearch.focus();

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeModal();

        }

    }
);


/* =====================================================
TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    const toast =
        $("toast");


    const text =
        $("toastMessage");


    if (
        !toast
        ||
        !text
    ) {

        return;

    }


    text.textContent =
        message;


    toast
        .classList
        .add(
            "show"
        );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function () {

                toast
                    .classList
                    .remove(
                        "show"
                    );

            },
            2500
        );

}


/* =====================================================
BACK TO TOP
===================================================== */

const backToTop =
    $("backToTop");


if (backToTop) {

    window
        .addEventListener(
            "scroll",
            function () {

                backToTop
                    .classList
                    .toggle(

                        "show",

                        window.scrollY >
                            500

                    );

            }
        );


    backToTop
        .addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        "smooth"

                });

            }
        );

}


/* =====================================================
EXPLORE NAVIGATION
===================================================== */

function setupExploreLinks() {

    if (isExplorePage) {
        return;
    }


    document
        .querySelectorAll(
            'a[href="#explore"]'
        )
        .forEach(
            link => {

                link.href =
                    "explore.html";

            }
        );


    document
        .querySelectorAll(
            ".desktop-nav a, .mobile-nav a, .mobile-menu a"
        )
        .forEach(
            link => {

                if (
                    (
                        link.textContent
                        || ""
                    )
                    .trim()
                    .toLowerCase() ===
                    "explore"
                ) {

                    link.href =
                        "explore.html";

                }

            }
        );

}


/* =====================================================
CARD ANIMATION
===================================================== */

function animateToolCards() {

    document
        .querySelectorAll(
            "#toolGrid .tool-card"
        )
        .forEach(
            (
                card,
                index
            ) => {

                card.style.animationDelay =
                    `${
                        Math.min(
                            index * 35,
                            350
                        )
                    }ms`;

            }
        );

}


/* =====================================================
TOOL COUNT
===================================================== */

const toolCount =
    $("toolCount");


if (toolCount) {

    toolCount.textContent =
        `${tools.length}+`;

}


/* =====================================================
INITIALIZE
===================================================== */

function initializeApp() {

    setupExploreLinks();

    applyIncomingFilters();

    renderTools();

    updateFavorites();

    renderToolOfDay();

    renderTrending();

    renderNewTools();

    loadCompareOptions();

}


initializeApp();
/* =====================================================
   CURSOR GLOW ANIMATION
===================================================== */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    let cursorGlow =
        document.querySelector(
            ".cursor-glow"
        );


    if (!cursorGlow) {

        cursorGlow =
            document.createElement(
                "div"
            );


        cursorGlow.className =
            "cursor-glow";


        document.body.appendChild(
            cursorGlow
        );

    }


    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        function (event) {

            mouseX =
                event.clientX;


            mouseY =
                event.clientY;

        }
    );


    function animateCursorGlow() {

        /*
        Smooth trailing movement
        */

        glowX +=
            (mouseX - glowX) *
            0.14;


        glowY +=
            (mouseY - glowY) *
            0.14;


        cursorGlow.style.left =
            glowX + "px";


        cursorGlow.style.top =
            glowY + "px";


        requestAnimationFrame(
            animateCursorGlow
        );

    }


    animateCursorGlow();

}
/* =========================================================
   AI VAULT - PRICING NORMALIZATION
   Only Freemium and Paid
========================================================= */

if (
    typeof tools !== "undefined" &&
    Array.isArray(tools)
) {

    tools.forEach(function (tool) {

        /*
           Remove old "Free" pricing.

           Existing Free tools will now
           appear as Freemium.
        */

        if (
            tool.pricing &&
            tool.pricing
                .toLowerCase()
                .trim() === "free"
        ) {

            tool.pricing =
                "Freemium";

        }


        /*
           Fix common spelling variations.
        */

        if (
            tool.pricing &&
            (
                tool.pricing
                    .toLowerCase()
                    .trim() === "freeium" ||

                tool.pricing
                    .toLowerCase()
                    .trim() === "freemium "
            )
        ) {

            tool.pricing =
                "Freemium";

        }

    });

}