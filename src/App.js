import React, { useState } from "react";

const trends = [
  {
    id: "dorm",
    name: "开学宿舍改造",
    heat: "高",
    competition: "中",
    platform: "小红书 / 抖音",
    pain: "宿舍空间小，不知道如何低成本改造",
  },
  {
    id: "ai",
    name: "AI 学习工具",
    heat: "高",
    competition: "高",
    platform: "小红书 / B站",
    pain: "工具太多，不知道哪个真正适合大学生",
  },
  {
    id: "sun",
    name: "平价防晒",
    heat: "中高",
    competition: "高",
    platform: "小红书 / 抖音",
    pain: "学生党预算有限，怕踩雷",
  },
  {
    id: "breakfast",
    name: "早八早餐杯测评",
    heat: "中",
    competition: "中低",
    platform: "小红书 / 抖音",
    pain: "早八没时间吃饭，又怕代餐踩雷",
  },
];

const baseIdeas = [
  {
    id: "storage",
    title: "宿舍收纳别乱买：这 3 类才是真的救命",
    score: 92,
    trend: "开学宿舍改造",
    reason: "符合学生党真实测评人设，真实体验感强，低成本也容易拍。",
    angle: "真实避坑型",
    uniqueness: "用自己的宿舍桌面混乱经历切入，而不是做普通清单。",
    tags: ["宿舍", "收纳", "避坑"],
  },
  {
    id: "ai-note",
    title: "我试了 5 个 AI 笔记工具，真正适合大学生的是这个",
    score: 88,
    trend: "AI 学习工具",
    reason: "贴合学习效率工具方向，但需要用真实学习场景降低技术门槛。",
    angle: "学习场景型",
    uniqueness: "从一节课、一篇论文、一次复习三个场景测试，而不是只罗列功能。",
    tags: ["AI工具", "学习效率", "大学生"],
  },
  {
    id: "sunscreen",
    title: "学生党防晒怎么选：不是越贵越好",
    score: 84,
    trend: "平价防晒",
    reason: "有明确预算人群和强需求，但竞争较高，需要突出真实肤感。",
    angle: "预算决策型",
    uniqueness: "用预算分层和通勤场景做判断，避免变成千篇一律的种草。",
    tags: ["防晒", "学生党", "真实测评"],
  },
];

const steps = [
  { id: "profile", label: "人设定位", icon: "👤" },
  { id: "radar", label: "选题雷达", icon: "📡" },
  { id: "content", label: "内容方案", icon: "✍️" },
  { id: "review", label: "发布复盘", icon: "📊" },
];

const performanceSeries = [
  { label: "第1条", exposure: 5200, saveRate: 2.8, fans: 28 },
  { label: "第2条", exposure: 7600, saveRate: 3.6, fans: 42 },
  { label: "第3条", exposure: 9100, saveRate: 4.1, fans: 61 },
  { label: "本条", exposure: 12430, saveRate: 5.2, fans: 126 },
];

function Badge({ children, dark = false }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        dark ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600"
      }`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200 ${className}`}
    >
      {children}
    </div>
  );
}

function Field({ label, value, onChange, textarea = false, placeholder = "" }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {textarea ? (
        <textarea
          className="mt-2 h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-slate-900"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-slate-900"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.exposure));
  return (
    <div className="rounded-3xl bg-slate-50 p-5">
      <div className="flex items-center justify-between">
        <p className="font-bold text-slate-950">近 4 条内容曝光趋势</p>
        <Badge>持续上升</Badge>
      </div>
      <div className="mt-6 flex h-44 items-end gap-4">
        {data.map((d) => (
          <div
            key={d.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div className="flex h-32 w-full items-end rounded-2xl bg-white p-2 ring-1 ring-slate-100">
              <div
                className="w-full rounded-xl bg-slate-900"
                style={{ height: `${Math.max(16, (d.exposure / max) * 100)}%` }}
              />
            </div>
            <p className="text-xs font-medium text-slate-500">{d.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarScore() {
  const items = [
    ["人设适配", 92],
    ["真实经历", 88],
    ["差异角度", 84],
    ["可拍摄性", 90],
    ["商业潜力", 79],
  ];
  return (
    <div className="rounded-3xl bg-slate-50 p-5">
      <p className="font-bold text-slate-950">选题差异化评分</p>
      <div className="mt-4 space-y-3">
        {items.map(([name, value]) => (
          <div key={name}>
            <div className="mb-1 flex justify-between text-xs text-slate-500">
              <span>{name}</span>
              <span>{value}</span>
            </div>
            <div className="h-2 rounded-full bg-white">
              <div
                className="h-2 rounded-full bg-slate-900"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("profile");
  const [toast, setToast] = useState("");
  const [profileInput, setProfileInput] = useState({
    categories: "宿舍好物、学习效率工具、平价护肤",
    job: "大学生",
    style: "真诚、实用、有审美、不夸张",
    audience: "18–25 岁学生党 / 初入职场女生",
    lifeScenes: "宿舍空间小、预算有限、早八多、经常需要做课程汇报",
    personalStories:
      "买过很多收纳用品，有些只是好看但不好用；更相信长期使用后的真实感受",
    values: "不制造焦虑，不夸张种草，希望帮同龄人少花冤枉钱",
    constraints: "预算有限，拍摄设备普通，主要在宿舍和校园场景拍摄",
  });
  const [profile, setProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [matched, setMatched] = useState(false);
  const [ideas, setIdeas] = useState(baseIdeas);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [draft, setDraft] = useState(null);
  const [published, setPublished] = useState(false);
  const [report, setReport] = useState(null);
  const [brandCases, setBrandCases] = useState(0);

  const show = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 1800);
  };

  const reset = () => {
    setStep("profile");
    setProfile(null);
    setEditingProfile(false);
    setScanned(false);
    setMatched(false);
    setIdeas(baseIdeas);
    setSelectedIdea(null);
    setDraft(null);
    setPublished(false);
    setReport(null);
    setBrandCases(0);
    show("Demo 已重置");
  };

  const generateProfile = () => {
    setProfile({
      persona: `${profileInput.job}真实测评型生活方式 KOC`,
      audience: profileInput.audience,
      tone: profileInput.style,
      keyword: `${profileInput.job}真实测评官：用自己的生活场景、预算限制和长期体验，帮同龄人少花冤枉钱。`,
      avoid: "不建议做与真实身份割裂、过度营销、制造焦虑或缺乏使用证据的内容。",
      differentiators: [
        "真实生活场景",
        "预算约束",
        "长期使用体验",
        "明确购买判断",
      ],
    });
    show("已生成人设定位");
  };

  const saveProfileEdit = () => {
    if (!profile) generateProfile();
    setProfile((prev) => ({
      ...prev,
      persona: `${profileInput.job}真实测评型生活方式 KOC`,
      audience: profileInput.audience,
      tone: profileInput.style,
      keyword: `${profileInput.job}真实测评官：围绕“${profileInput.lifeScenes}”输出真实测评和避坑判断。`,
      differentiators: ["真实生活场景", "个人故事", "价值观边界", "拍摄约束"],
    }));
    setEditingProfile(false);
    show("已根据你的修改更新人设模型");
  };

  const scanTrends = () => {
    setScanned(true);
    show("已扫描平台趋势");
  };

  const matchPersona = () => {
    if (!profile) generateProfile();
    const personalized = baseIdeas.map((idea, index) => ({
      ...idea,
      title: index === 0 ? `用我的真实宿舍桌面复盘：${idea.title}` : idea.title,
      reason: `${idea.reason} 系统已加入你的个人场景：${profileInput.lifeScenes}。`,
    }));
    setIdeas(personalized);
    setMatched(true);
    show("已结合人设、生活场景和个人故事生成差异化选题");
  };

  const chooseIdea = (idea) => {
    setSelectedIdea(idea);
    setDraft(null);
    setStep("content");
    show("选题已带入内容方案页");
  };

  const generateDraft = () => {
    const idea = selectedIdea || ideas[0];
    setSelectedIdea(idea);
    setDraft({
      title: idea.title,
      cover: "宿舍收纳别冲动买！真正有用的是这 3 类",
      emotionalHook: "如果你也经常觉得桌面越收越乱，这条可以先收藏。",
      opening:
        "我以前也买过很多看起来很高级的宿舍收纳，但真正长期留下来的，其实不是最贵的那几个。",
      structure: [
        "第一段：先展示真实痛点，例如桌面小、东西多、早上赶课拿东西很乱。",
        "第二段：分 3 类产品讲清楚：适合谁、不适合谁、我为什么留下它。",
        "第三段：给出购买优先级：先买高频使用的，不要为了好看买低频摆设。",
        "第四段：用评论区问题承接下一条内容，例如床边挂篮、桌面架、抽屉分隔盒。",
      ],
      shotList: [
        "真实桌面 before",
        "收纳后 after",
        "拿取动线演示",
        "踩坑产品对比",
        "结尾判断清单",
      ],
      commentGuide:
        "你们宿舍最乱的是桌面、床边还是衣柜？我下一条按评论最多的先测。",
      actionCard: {
        firstMove: "先拍真实桌面 before，不要先拍产品特写。",
        keyJudgement: "每一类产品都给出“适合谁 / 不适合谁”的判断。",
        nextHook: "评论区追问最多的场景，直接变成下一条内容。",
      },
      warning:
        "避免使用“全网最好”“必买不踩雷”等绝对化表达，建议改为“我个人更推荐”“更适合小桌面宿舍”。",
    });
    show("已生成增强版内容方案");
  };

  const publish = () => {
    setPublished(true);
    setStep("review");
    show("已模拟发布，进入复盘");
  };

  const analyze = () => {
    setReport({
      result:
        "这条内容表现较好，主要原因是选题贴近学生党真实痛点，且“别乱买”的表达降低了营销感。收藏率和评论问题说明它适合系列化。",
      next: "床边挂篮到底值不值得买？我用了 30 天后的真实感受",
      insight:
        "用户不是只想看产品清单，而是想知道在真实宿舍场景中到底该不该买、先买什么、哪些没必要。",
    });
    show("已生成图表复盘和下一条建议");
  };

  const nextIdea = () => {
    const newIdea = {
      id: "bedside",
      title: "床边挂篮到底值不值得买？我用了 30 天后的真实感受",
      score: 90,
      trend: "开学宿舍改造",
      reason: "来自上一条内容评论区追问，可以自然延展成系列化内容。",
      angle: "评论驱动型",
      uniqueness: "不是追热点，而是用用户评论反推下一条内容。",
      tags: ["床边收纳", "宿舍改造", "真实使用"],
    };
    setIdeas((prev) => [newIdea, ...prev.filter((x) => x.id !== "bedside")]);
    setSelectedIdea(newIdea);
    setStep("content");
    setDraft(null);
    show("已把复盘洞察转成下一条选题");
  };

  const loadDemo = () => {
    generateProfile();
    setScanned(true);
    setMatched(true);
    setIdeas(baseIdeas);
    setSelectedIdea(baseIdeas[0]);
    setStep("content");
    show("已加载完整演示状态");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),radial-gradient(circle_at_top_right,#fae8ff,transparent_30%),#f8fafc] p-5 text-slate-900 md:p-8">
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          ✅ {toast}
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-xl text-white shadow-lg">
              ✨
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                KOC Growth Agent
              </p>
              <h1 className="text-xl font-bold">人格化内容增长工作台</h1>
            </div>
          </div>
          <button
            onClick={reset}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm"
          >
            新建账号诊断
          </button>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
            <div className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative z-10">
              <Badge dark>从“想发什么”到“为什么能涨粉”</Badge>
              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                KOC 人格化增长 Agent
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                面向 0–1 万粉新手
                KOC，完成“人设定位—平台趋势捕捉—差异化选题—内容方案—数据复盘—品牌合作资产”的完整增长闭环。
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => setStep("profile")}
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg"
                >
                  开始账号诊断 →
                </button>
                <button
                  onClick={loadDemo}
                  className="rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15"
                >
                  一键演示完整闭环
                </button>
              </div>
            </div>
          </div>

          <Card>
            <p className="text-sm text-slate-500">今日增长任务</p>
            <h3 className="mt-1 text-2xl font-bold">完成 1 条可发布内容</h3>
            <div className="mt-6 space-y-3">
              {[
                ["明确本周人设关键词", profile],
                ["扫描平台趋势并匹配选题", matched],
                ["产出脚本与标题", draft],
                ["复盘数据并生成下一条", report],
              ].map(([task, done]) => (
                <div
                  key={task}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >
                  <span className="text-sm font-medium">{task}</span>
                  <span>{done ? "✅" : "○"}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <nav className="grid gap-2 rounded-3xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-200 backdrop-blur md:grid-cols-4">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`rounded-2xl px-4 py-3 text-left transition ${
                step === s.id
                  ? "bg-slate-950 text-white shadow-md"
                  : "hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{s.icon}</span>
                <div>
                  <p className="text-sm font-semibold">{s.label}</p>
                  <p
                    className={`text-xs ${
                      step === s.id ? "text-white/70" : "text-slate-500"
                    }`}
                  >
                    点击切换
                  </p>
                </div>
              </div>
            </button>
          ))}
        </nav>

        {step === "profile" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <h3 className="text-xl font-bold">账号体检</h3>
              <p className="mt-1 text-sm text-slate-500">
                不是只问“发什么”，而是建立一个更细的人设模型，减少后续内容同质化。
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Field
                  label="主要分享类型"
                  value={profileInput.categories}
                  onChange={(v) =>
                    setProfileInput({ ...profileInput, categories: v })
                  }
                />
                <Field
                  label="身份 / 职业"
                  value={profileInput.job}
                  onChange={(v) => setProfileInput({ ...profileInput, job: v })}
                />
                <Field
                  label="表达风格"
                  value={profileInput.style}
                  onChange={(v) =>
                    setProfileInput({ ...profileInput, style: v })
                  }
                />
                <Field
                  label="目标观众"
                  value={profileInput.audience}
                  onChange={(v) =>
                    setProfileInput({ ...profileInput, audience: v })
                  }
                />
                <Field
                  label="真实生活场景"
                  value={profileInput.lifeScenes}
                  onChange={(v) =>
                    setProfileInput({ ...profileInput, lifeScenes: v })
                  }
                  textarea
                />
                <Field
                  label="个人经历 / 踩坑故事"
                  value={profileInput.personalStories}
                  onChange={(v) =>
                    setProfileInput({ ...profileInput, personalStories: v })
                  }
                  textarea
                />
                <Field
                  label="价值观边界"
                  value={profileInput.values}
                  onChange={(v) =>
                    setProfileInput({ ...profileInput, values: v })
                  }
                  textarea
                />
                <Field
                  label="创作限制"
                  value={profileInput.constraints}
                  onChange={(v) =>
                    setProfileInput({ ...profileInput, constraints: v })
                  }
                  textarea
                />
              </div>
              <button
                onClick={generateProfile}
                className="mt-5 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-md"
              >
                ✨ 生成人设定位
              </button>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">AI 建议定位</h3>
                {profile && <Badge>可编辑</Badge>}
              </div>
              {!profile ? (
                <div className="mt-6 flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 text-center text-slate-500">
                  点击左侧按钮生成定位
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs text-slate-500">当前定位</p>
                      <p className="mt-2 text-sm font-bold">
                        {profile.persona}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs text-slate-500">目标粉丝</p>
                      <p className="mt-2 text-sm font-bold">
                        {profile.audience}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs text-slate-500">内容气质</p>
                      <p className="mt-2 text-sm font-bold">{profile.tone}</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-emerald-50 p-5 text-emerald-900">
                    <b>本周关键词：</b>
                    {profile.keyword}
                  </div>
                  <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
                    <p className="font-bold">差异化锚点</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {profile.differentiators.map((x) => (
                        <Badge key={x}>{x}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-3xl bg-rose-50 p-5 text-rose-900">
                    <b>不建议方向：</b>
                    {profile.avoid}
                  </div>
                  {editingProfile && (
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="font-bold">修改建议</p>
                      <p className="mt-2 text-sm text-slate-600">
                        你可以直接改左侧输入项，例如换一个更具体的个人经历、价值观边界或创作限制，再点击保存。系统会更新人设模型。
                      </p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200"
                    >
                      我不满意，自己修改
                    </button>
                    <button
                      onClick={saveProfileEdit}
                      className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-md"
                    >
                      保存修改后的人设
                    </button>
                    <button
                      onClick={() => setStep("radar")}
                      className="rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-md"
                    >
                      采纳定位，进入选题雷达 →
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </section>
        )}

        {step === "radar" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">平台趋势雷达</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    热点由系统捕捉，用户不需要自己输入。
                  </p>
                </div>
                <button
                  onClick={scanTrends}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                >
                  扫描趋势
                </button>
              </div>
              <div className="mt-6 space-y-3">
                {!scanned ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
                    等待扫描平台趋势
                  </div>
                ) : (
                  trends.map((t) => (
                    <div key={t.id} className="rounded-3xl bg-slate-50 p-5">
                      <div className="flex justify-between gap-3">
                        <h4 className="font-bold">🔥 {t.name}</h4>
                        <Badge>热度 {t.heat}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{t.pain}</p>
                      <div className="mt-3 flex gap-2">
                        <Badge>竞争 {t.competition}</Badge>
                        <Badge>{t.platform}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">人设匹配与差异化选题</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    同一个热点，会根据个人经历、价值观和拍摄约束生成不同角度。
                  </p>
                </div>
                <button
                  onClick={matchPersona}
                  disabled={!scanned}
                  className="rounded-2xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white disabled:bg-slate-300"
                >
                  匹配人设
                </button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {!matched ? (
                  <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
                    先扫描趋势，再匹配人设
                  </div>
                ) : (
                  ideas.map((idea) => (
                    <div
                      key={idea.id}
                      className={`rounded-3xl border p-5 ${
                        selectedIdea?.id === idea.id
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="flex justify-between gap-3">
                        <Badge dark={selectedIdea?.id === idea.id}>
                          匹配度 {idea.score}
                        </Badge>
                        <span>📈</span>
                      </div>
                      <h4 className="mt-4 font-bold leading-6">{idea.title}</h4>
                      <p
                        className={`mt-3 text-sm leading-6 ${
                          selectedIdea?.id === idea.id
                            ? "text-white/75"
                            : "text-slate-500"
                        }`}
                      >
                        {idea.reason}
                      </p>
                      <div
                        className={`mt-3 rounded-2xl p-3 text-xs ${
                          selectedIdea?.id === idea.id
                            ? "bg-white/10 text-white/75"
                            : "bg-white text-slate-600"
                        }`}
                      >
                        <b>差异化角度：</b>
                        {idea.uniqueness}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {idea.tags.map((tag) => (
                          <Badge key={tag} dark={selectedIdea?.id === idea.id}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <button
                        onClick={() => chooseIdea(idea)}
                        className={`mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold ${
                          selectedIdea?.id === idea.id
                            ? "bg-white text-slate-950"
                            : "bg-white text-slate-950 ring-1 ring-slate-200"
                        }`}
                      >
                        选择该选题 →
                      </button>
                    </div>
                  ))
                )}
              </div>
              {matched && (
                <div className="mt-5">
                  <RadarScore />
                </div>
              )}
            </Card>
          </section>
        )}

        {step === "content" && (
          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Card>
              <div className="rounded-3xl bg-cyan-50 p-5 text-cyan-950">
                <p className="text-xs font-semibold text-cyan-700">已选选题</p>
                <h3 className="mt-2 text-xl font-bold">
                  {(selectedIdea || ideas[0]).title}
                </h3>
                <p className="mt-2 text-sm">
                  来源趋势：{(selectedIdea || ideas[0]).trend}
                </p>
              </div>
              <h3 className="mt-6 text-xl font-bold">内容生成器</h3>
              <p className="mt-1 text-sm text-slate-500">
                目标不是给一段文案，而是让迷茫 KOC
                知道怎么拍、怎么说、怎么延展。
              </p>
              <textarea
                className="mt-5 h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:ring-2 focus:ring-slate-900"
                defaultValue="我以前买过很多宿舍收纳用品，但很多只是看起来好看，真正好用的是不占桌面、拿取方便、价格不贵的。"
              />
              <button
                onClick={generateDraft}
                className="mt-4 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-md"
              >
                生成增强版内容方案
              </button>
            </Card>

            <Card>
              <h3 className="text-xl font-bold">生成结果预览</h3>
              {!draft ? (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-16 text-center text-slate-500">
                  等待生成内容方案
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs text-slate-500">标题建议</p>
                      <p className="mt-2 text-lg font-bold">{draft.title}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-xs text-slate-500">封面文案</p>
                      <p className="mt-2 font-bold">{draft.cover}</p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-fuchsia-50 p-5 text-fuchsia-950">
                    <p className="font-bold">情绪切入</p>
                    <p className="mt-2 text-sm leading-6">
                      {draft.emotionalHook}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="font-bold">内容结构</p>
                    <p className="mt-3 text-sm leading-6">
                      <b>开头：</b>
                      {draft.opening}
                    </p>
                    <div className="mt-3 space-y-2">
                      {draft.structure.map((x) => (
                        <p
                          key={x}
                          className="rounded-2xl bg-white p-3 text-sm leading-6 ring-1 ring-slate-100"
                        >
                          {x}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="font-bold">拍摄清单</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {draft.shotList.map((x) => (
                          <Badge key={x}>{x}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="font-bold">评论区引导</p>
                      <p className="mt-2 text-sm leading-6">
                        {draft.commentGuide}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-emerald-50 p-5 text-emerald-950">
                    <p className="font-bold">创作行动卡</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl bg-white/70 p-3 text-sm leading-6">
                        <b>第一步：</b>
                        {draft.actionCard.firstMove}
                      </div>
                      <div className="rounded-2xl bg-white/70 p-3 text-sm leading-6">
                        <b>判断标准：</b>
                        {draft.actionCard.keyJudgement}
                      </div>
                      <div className="rounded-2xl bg-white/70 p-3 text-sm leading-6">
                        <b>下一条线索：</b>
                        {draft.actionCard.nextHook}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-amber-50 p-5 text-sm text-amber-900">
                    <b>合规提醒：</b>
                    {draft.warning}
                  </div>
                  <button
                    onClick={publish}
                    className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-md"
                  >
                    标记为已发布，进入复盘 →
                  </button>
                </div>
              )}
            </Card>
          </section>
        )}

        {step === "review" && (
          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">发布复盘</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    用图表看趋势，再把数据变成下一条行动。
                  </p>
                </div>
                <button
                  onClick={analyze}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                >
                  分析数据
                </button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-6">
                {[
                  ["曝光", "12,430"],
                  ["点赞", "860"],
                  ["收藏", "386"],
                  ["评论", "92"],
                  ["完播", "41%"],
                  ["涨粉", "126"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs text-slate-500">{k}</p>
                    <p className="mt-2 text-xl font-bold">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.7fr]">
                <MiniBarChart data={performanceSeries} />
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="font-bold">关键指标解释</p>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <p>
                      <b>收藏率：</b>5.2%，说明内容具备实用决策价值。
                    </p>
                    <p>
                      <b>评论率：</b>0.74%，说明观众有追问，适合系列化。
                    </p>
                    <p>
                      <b>涨粉效率：</b>每千曝光涨粉约 10.1，说明人设表达有效。
                    </p>
                  </div>
                </div>
              </div>
              {report && (
                <div className="mt-6 rounded-3xl bg-emerald-50 p-5 text-emerald-950">
                  <p className="font-bold">AI 复盘结论</p>
                  <p className="mt-2 text-sm leading-6">{report.result}</p>
                  <div className="mt-4 rounded-2xl bg-white/70 p-4 text-sm">
                    <b>用户洞察：</b>
                    {report.insight}
                  </div>
                  <div className="mt-3 rounded-2xl bg-white/70 p-4 text-sm">
                    <b>下一条建议：</b>
                    {report.next}
                  </div>
                  <button
                    onClick={nextIdea}
                    className="mt-4 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white"
                  >
                    生成下一条选题 →
                  </button>
                </div>
              )}
            </Card>

            <Card>
              <h3 className="text-xl font-bold">品牌合作说服页</h3>
              <p className="mt-1 text-sm text-slate-500">
                不仅沉淀案例，还要把你的商业价值讲给品牌方听。
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs text-slate-500">内容转化潜力</p>
                  <p className="mt-2 text-2xl font-bold">高</p>
                  <p className="mt-1 text-xs text-slate-500">
                    收藏率高，适合决策型种草
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs text-slate-500">发展潜力</p>
                  <p className="mt-2 text-2xl font-bold">+126</p>
                  <p className="mt-1 text-xs text-slate-500">
                    单条内容新增粉丝
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs text-slate-500">互动质量</p>
                  <p className="mt-2 text-2xl font-bold">92</p>
                  <p className="mt-1 text-xs text-slate-500">
                    评论追问可转化为系列内容
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs text-slate-500">已沉淀案例</p>
                  <p className="mt-2 text-2xl font-bold">{brandCases}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    可用于品牌合作简报
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
                <p className="font-bold">给品牌方看的合作理由</p>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  该 KOC
                  不是单纯曝光型账号，而是具备“真实测评—购买判断—评论追问—系列复购心智”的内容链路，适合宿舍好物、学习工具和平价生活方式品牌进行早期心智种草。
                </p>
              </div>
              <div className="mt-5 rounded-3xl bg-cyan-50 p-5 text-cyan-950">
                <p className="font-bold">建议合作包</p>
                <p className="mt-2 text-sm leading-6">
                  1 条真实测评图文 + 1 条评论区追问延展短视频 + 7
                  天数据复盘报告。
                </p>
              </div>
              <button
                onClick={() => {
                  setBrandCases(brandCases + 1);
                  show("已沉淀为品牌合作案例");
                }}
                className="mt-5 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-md"
              >
                沉淀为品牌合作案例
              </button>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
