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
    uniqueness: "用自己的宿舍桌面混乱经历切入，而不是做普通清单。",
    tags: ["宿舍", "收纳", "避坑"],
  },
  {
    id: "ai-note",
    title: "我试了 5 个 AI 笔记工具，真正适合大学生的是这个",
    score: 88,
    trend: "AI 学习工具",
    reason: "贴合学习效率工具方向，但需要用真实学习场景降低技术门槛。",
    uniqueness: "从一节课、一篇论文、一次复习三个场景测试，而不是只罗列功能。",
    tags: ["AI工具", "学习效率", "大学生"],
  },
  {
    id: "sunscreen",
    title: "学生党防晒怎么选：不是越贵越好",
    score: 84,
    trend: "平价防晒",
    reason: "有明确预算人群和强需求，但竞争较高，需要突出真实肤感。",
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
  { label: "第1条", exposure: 5200 },
  { label: "第2条", exposure: 7600 },
  { label: "第3条", exposure: 9100 },
  { label: "本条", exposure: 12430 },
];

function Badge({ children, dark = false }) {
  return <span className={dark ? "badge badge-dark" : "badge"}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Field({ label, value, onChange, textarea = false }) {
  return (
    <label className="field">
      <span>{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.exposure));

  return (
    <div className="chart-card">
      <div className="section-head">
        <h3>近 4 条内容曝光趋势</h3>
        <Badge>持续上升</Badge>
      </div>
      <div className="bar-chart">
        {data.map((d) => (
          <div className="bar-item" key={d.label}>
            <div className="bar-box">
              <div
                className="bar"
                style={{ height: `${Math.max(16, (d.exposure / max) * 100)}%` }}
              />
            </div>
            <div className="bar-label">{d.label}</div>
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
    <div className="score-card">
      <h3>选题差异化评分</h3>
      {items.map(([name, value]) => (
        <div className="score-row" key={name}>
          <div className="score-top">
            <span>{name}</span>
            <span>{value}</span>
          </div>
          <div className="score-track">
            <div className="score-fill" style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
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
  const [report, setReport] = useState(null);
  const [brandCases, setBrandCases] = useState(0);

  function show(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1800);
  }

  function reset() {
    setStep("profile");
    setProfile(null);
    setEditingProfile(false);
    setScanned(false);
    setMatched(false);
    setIdeas(baseIdeas);
    setSelectedIdea(null);
    setDraft(null);
    setReport(null);
    setBrandCases(0);
    show("Demo 已重置");
  }

  function generateProfile() {
    setProfile({
      persona: `${profileInput.job}真实测评型生活方式 KOC`,
      audience: profileInput.audience,
      tone: profileInput.style,
      keyword: `${profileInput.job}真实测评官：用自己的生活场景、预算限制和长期体验，帮同龄人少花冤枉钱。`,
      avoid: "不建议做与真实身份割裂、过度营销、制造焦虑或缺乏使用证据的内容。",
      differentiators: ["真实生活场景", "预算约束", "长期使用体验", "明确购买判断"],
    });
    show("已生成人设定位");
  }

  function saveProfileEdit() {
    setProfile({
      persona: `${profileInput.job}真实测评型生活方式 KOC`,
      audience: profileInput.audience,
      tone: profileInput.style,
      keyword: `${profileInput.job}真实测评官：围绕“${profileInput.lifeScenes}”输出真实测评和避坑判断。`,
      avoid: "不建议做与真实身份割裂、过度营销、制造焦虑或缺乏使用证据的内容。",
      differentiators: ["真实生活场景", "个人故事", "价值观边界", "拍摄约束"],
    });
    setEditingProfile(false);
    show("已根据你的修改更新人设模型");
  }

  function scanTrends() {
    setScanned(true);
    show("已扫描平台趋势");
  }

  function matchPersona() {
    if (!profile) generateProfile();

    const personalized = baseIdeas.map((idea, index) => ({
      ...idea,
      title: index === 0 ? `用我的真实宿舍桌面复盘：${idea.title}` : idea.title,
      reason: `${idea.reason} 系统已加入你的个人场景：${profileInput.lifeScenes}。`,
    }));

    setIdeas(personalized);
    setMatched(true);
    show("已结合人设、生活场景和个人故事生成差异化选题");
  }

  function chooseIdea(idea) {
    setSelectedIdea(idea);
    setDraft(null);
    setStep("content");
    show("选题已带入内容方案页");
  }

  function generateDraft() {
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
  }

  function publish() {
    setStep("review");
    show("已模拟发布，进入复盘");
  }

  function analyze() {
    setReport({
      result:
        "这条内容表现较好，主要原因是选题贴近学生党真实痛点，且“别乱买”的表达降低了营销感。收藏率和评论问题说明它适合系列化。",
      next: "床边挂篮到底值不值得买？我用了 30 天后的真实感受",
      insight:
        "用户不是只想看产品清单，而是想知道在真实宿舍场景中到底该不该买、先买什么、哪些没必要。",
    });
    show("已生成图表复盘和下一条建议");
  }

  function nextIdea() {
    const newIdea = {
      id: "bedside",
      title: "床边挂篮到底值不值得买？我用了 30 天后的真实感受",
      score: 90,
      trend: "开学宿舍改造",
      reason: "来自上一条内容评论区追问，可以自然延展成系列化内容。",
      uniqueness: "不是追热点，而是用用户评论反推下一条内容。",
      tags: ["床边收纳", "宿舍改造", "真实使用"],
    };

    setIdeas((prev) => [newIdea, ...prev.filter((x) => x.id !== "bedside")]);
    setSelectedIdea(newIdea);
    setStep("content");
    setDraft(null);
    show("已把复盘洞察转成下一条选题");
  }

  function loadDemo() {
    setProfile({
      persona: "大学生真实测评型生活方式 KOC",
      audience: profileInput.audience,
      tone: profileInput.style,
      keyword:
        "大学生真实测评官：用自己的生活场景、预算限制和长期体验，帮同龄人少花冤枉钱。",
      avoid: "不建议做与真实身份割裂、过度营销、制造焦虑或缺乏使用证据的内容。",
      differentiators: ["真实生活场景", "预算约束", "长期使用体验", "明确购买判断"],
    });
    setScanned(true);
    setMatched(true);
    setIdeas(baseIdeas);
    setSelectedIdea(baseIdeas[0]);
    setStep("content");
    show("已加载完整演示状态");
  }

  const tasks = [
    ["明确本周人设关键词", Boolean(profile)],
    ["扫描平台趋势并匹配选题", matched],
    ["产出脚本与标题", Boolean(draft)],
    ["复盘数据并生成下一条", Boolean(report)],
  ];

  return (
    <div className="app">
      <style>{styles}</style>

      {toast && <div className="toast">✅ {toast}</div>}

      <div className="container">
        <header className="header">
          <div className="brand">
            <div className="logo">✨</div>
            <div>
              <p>KOC Growth Agent</p>
              <h1>人格化内容增长工作台</h1>
            </div>
          </div>
          <button className="btn dark" onClick={reset}>
            新建账号诊断
          </button>
        </header>

        <section className="hero-grid">
          <div className="hero">
            <div className="glow glow-one" />
            <div className="glow glow-two" />
            <div className="hero-content">
              <Badge dark>从“想发什么”到“为什么能涨粉”</Badge>
              <h2>KOC 人格化增长 Agent</h2>
              <p>
                面向 0–1 万粉新手 KOC，完成“人设定位—平台趋势捕捉—差异化选题—内容方案—数据复盘—品牌合作资产”的完整增长闭环。
              </p>
              <div className="actions">
                <button className="btn light" onClick={() => setStep("profile")}>
                  开始账号诊断 →
                </button>
                <button className="btn ghost" onClick={loadDemo}>
                  一键演示完整闭环
                </button>
              </div>
            </div>
          </div>

          <Card>
            <p className="muted">今日增长任务</p>
            <h2 className="card-title">完成 1 条可发布内容</h2>
            <div className="task-list">
              {tasks.map(([task, done]) => (
                <div className="task" key={task}>
                  <span>{task}</span>
                  <span>{done ? "✅" : "○"}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <nav className="steps">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={step === s.id ? "step active" : "step"}
            >
              <span>{s.icon}</span>
              <div>
                <strong>{s.label}</strong>
                <small>点击切换</small>
              </div>
            </button>
          ))}
        </nav>

        {step === "profile" && (
          <section className="two-col profile-layout">
            <Card>
              <h2>账号体检</h2>
              <p className="muted">
                不是只问“发什么”，而是建立一个更细的人设模型，减少后续内容同质化。
              </p>

              <div className="field-grid">
                <Field
                  label="主要分享类型"
                  value={profileInput.categories}
                  onChange={(v) => setProfileInput({ ...profileInput, categories: v })}
                />
                <Field
                  label="身份 / 职业"
                  value={profileInput.job}
                  onChange={(v) => setProfileInput({ ...profileInput, job: v })}
                />
                <Field
                  label="表达风格"
                  value={profileInput.style}
                  onChange={(v) => setProfileInput({ ...profileInput, style: v })}
                />
                <Field
                  label="目标观众"
                  value={profileInput.audience}
                  onChange={(v) => setProfileInput({ ...profileInput, audience: v })}
                />
                <Field
                  label="真实生活场景"
                  value={profileInput.lifeScenes}
                  onChange={(v) => setProfileInput({ ...profileInput, lifeScenes: v })}
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
                  onChange={(v) => setProfileInput({ ...profileInput, values: v })}
                  textarea
                />
                <Field
                  label="创作限制"
                  value={profileInput.constraints}
                  onChange={(v) => setProfileInput({ ...profileInput, constraints: v })}
                  textarea
                />
              </div>

              <button className="btn dark full" onClick={generateProfile}>
                ✨ 生成人设定位
              </button>
            </Card>

            <Card>
              <div className="section-head">
                <h2>AI 建议定位</h2>
                {profile && <Badge>可编辑</Badge>}
              </div>

              {!profile ? (
                <div className="empty">点击左侧按钮生成定位</div>
              ) : (
                <div className="stack">
                  <div className="mini-grid">
                    <div className="mini-card">
                      <small>当前定位</small>
                      <strong>{profile.persona}</strong>
                    </div>
                    <div className="mini-card">
                      <small>目标粉丝</small>
                      <strong>{profile.audience}</strong>
                    </div>
                    <div className="mini-card">
                      <small>内容气质</small>
                      <strong>{profile.tone}</strong>
                    </div>
                  </div>

                  <div className="notice green">
                    <strong>本周关键词：</strong>
                    {profile.keyword}
                  </div>

                  <div className="mini-card white">
                    <strong>差异化锚点</strong>
                    <div className="tag-row">
                      {profile.differentiators.map((x) => (
                        <Badge key={x}>{x}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="notice red">
                    <strong>不建议方向：</strong>
                    {profile.avoid}
                  </div>

                  {editingProfile && (
                    <div className="notice">
                      你可以直接修改左侧输入项，再点击“保存修改后的人设”。系统会更新人设模型。
                    </div>
                  )}

                  <div className="actions wrap">
                    <button className="btn outline" onClick={() => setEditingProfile(true)}>
                      我不满意，自己修改
                    </button>
                    <button className="btn dark" onClick={saveProfileEdit}>
                      保存修改后的人设
                    </button>
                    <button className="btn cyan" onClick={() => setStep("radar")}>
                      采纳定位，进入选题雷达 →
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </section>
        )}

        {step === "radar" && (
          <section className="two-col">
            <Card>
              <div className="section-head">
                <div>
                  <h2>平台趋势雷达</h2>
                  <p className="muted">热点由系统捕捉，用户不需要自己输入。</p>
                </div>
                <button className="btn dark" onClick={scanTrends}>
                  扫描趋势
                </button>
              </div>

              <div className="stack">
                {!scanned ? (
                  <div className="empty">等待扫描平台趋势</div>
                ) : (
                  trends.map((t) => (
                    <div className="trend" key={t.id}>
                      <div className="section-head">
                        <h3>🔥 {t.name}</h3>
                        <Badge>热度 {t.heat}</Badge>
                      </div>
                      <p>{t.pain}</p>
                      <div className="tag-row">
                        <Badge>竞争 {t.competition}</Badge>
                        <Badge>{t.platform}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <div className="section-head">
                <div>
                  <h2>人设匹配与差异化选题</h2>
                  <p className="muted">
                    同一个热点，会根据个人经历、价值观和拍摄约束生成不同角度。
                  </p>
                </div>
                <button className="btn cyan" disabled={!scanned} onClick={matchPersona}>
                  匹配人设
                </button>
              </div>

              {!matched ? (
                <div className="empty">先扫描趋势，再匹配人设</div>
              ) : (
                <div className="idea-grid">
                  {ideas.map((idea) => {
                    const active = selectedIdea && selectedIdea.id === idea.id;
                    return (
                      <div className={active ? "idea active" : "idea"} key={idea.id}>
                        <div className="section-head">
                          <Badge dark={active}>匹配度 {idea.score}</Badge>
                          <span>📈</span>
                        </div>
                        <h3>{idea.title}</h3>
                        <p>{idea.reason}</p>
                        <div className="angle">
                          <strong>差异化角度：</strong>
                          {idea.uniqueness}
                        </div>
                        <div className="tag-row">
                          {idea.tags.map((tag) => (
                            <Badge key={tag} dark={active}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <button
                          className={active ? "btn light full" : "btn outline full"}
                          onClick={() => chooseIdea(idea)}
                        >
                          选择该选题 →
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {matched && <RadarScore />}
            </Card>
          </section>
        )}

        {step === "content" && (
          <section className="two-col content-layout">
            <Card>
              <div className="notice blue">
                <small>已选选题</small>
                <h2>{(selectedIdea || ideas[0]).title}</h2>
                <p>来源趋势：{(selectedIdea || ideas[0]).trend}</p>
              </div>

              <h2>内容生成器</h2>
              <p className="muted">
                目标不是给一段文案，而是让迷茫 KOC 知道怎么拍、怎么说、怎么延展。
              </p>

              <textarea
                className="big-textarea"
                defaultValue="我以前买过很多宿舍收纳用品，但很多只是看起来好看，真正好用的是不占桌面、拿取方便、价格不贵的。"
              />

              <button className="btn dark full" onClick={generateDraft}>
                生成增强版内容方案
              </button>
            </Card>

            <Card>
              <h2>生成结果预览</h2>

              {!draft ? (
                <div className="empty">等待生成内容方案</div>
              ) : (
                <div className="stack">
                  <div className="mini-grid two">
                    <div className="mini-card">
                      <small>标题建议</small>
                      <strong>{draft.title}</strong>
                    </div>
                    <div className="mini-card">
                      <small>封面文案</small>
                      <strong>{draft.cover}</strong>
                    </div>
                  </div>

                  <div className="notice pink">
                    <strong>情绪切入</strong>
                    <p>{draft.emotionalHook}</p>
                  </div>

                  <div className="mini-card white">
                    <strong>内容结构</strong>
                    <p>
                      <b>开头：</b>
                      {draft.opening}
                    </p>
                    <div className="stack small-gap">
                      {draft.structure.map((x) => (
                        <div className="sub-card" key={x}>
                          {x}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mini-grid two">
                    <div className="mini-card">
                      <strong>拍摄清单</strong>
                      <div className="tag-row">
                        {draft.shotList.map((x) => (
                          <Badge key={x}>{x}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mini-card">
                      <strong>评论区引导</strong>
                      <p>{draft.commentGuide}</p>
                    </div>
                  </div>

                  <div className="notice green">
                    <strong>创作行动卡</strong>
                    <div className="action-card">
                      <div>
                        <b>第一步：</b>
                        {draft.actionCard.firstMove}
                      </div>
                      <div>
                        <b>判断标准：</b>
                        {draft.actionCard.keyJudgement}
                      </div>
                      <div>
                        <b>下一条线索：</b>
                        {draft.actionCard.nextHook}
                      </div>
                    </div>
                  </div>

                  <div className="notice yellow">
                    <strong>合规提醒：</strong>
                    {draft.warning}
                  </div>

                  <button className="btn dark full" onClick={publish}>
                    标记为已发布，进入复盘 →
                  </button>
                </div>
              )}
            </Card>
          </section>
        )}

        {step === "review" && (
          <section className="two-col review-layout">
            <Card>
              <div className="section-head">
                <div>
                  <h2>发布复盘</h2>
                  <p className="muted">用图表看趋势，再把数据变成下一条行动。</p>
                </div>
                <button className="btn dark" onClick={analyze}>
                  分析数据
                </button>
              </div>

              <div className="metrics">
                {[
                  ["曝光", "12,430"],
                  ["点赞", "860"],
                  ["收藏", "386"],
                  ["评论", "92"],
                  ["完播", "41%"],
                  ["涨粉", "126"],
                ].map(([k, v]) => (
                  <div className="metric" key={k}>
                    <small>{k}</small>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>

              <div className="two-col inner">
                <MiniBarChart data={performanceSeries} />
                <div className="chart-card">
                  <h3>关键指标解释</h3>
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

              {report && (
                <div className="notice green">
                  <strong>AI 复盘结论</strong>
                  <p>{report.result}</p>
                  <div className="sub-card">
                    <b>用户洞察：</b>
                    {report.insight}
                  </div>
                  <div className="sub-card">
                    <b>下一条建议：</b>
                    {report.next}
                  </div>
                  <button className="btn green" onClick={nextIdea}>
                    生成下一条选题 →
                  </button>
                </div>
              )}
            </Card>

            <Card>
              <h2>品牌合作说服页</h2>
              <p className="muted">不仅沉淀案例，还要把你的商业价值讲给品牌方听。</p>

              <div className="mini-grid two">
                <div className="mini-card">
                  <small>内容转化潜力</small>
                  <strong className="big">高</strong>
                  <p>收藏率高，适合决策型种草</p>
                </div>
                <div className="mini-card">
                  <small>发展潜力</small>
                  <strong className="big">+126</strong>
                  <p>单条内容新增粉丝</p>
                </div>
                <div className="mini-card">
                  <small>互动质量</small>
                  <strong className="big">92</strong>
                  <p>评论追问可转化为系列内容</p>
                </div>
                <div className="mini-card">
                  <small>已沉淀案例</small>
                  <strong className="big">{brandCases}</strong>
                  <p>可用于品牌合作简报</p>
                </div>
              </div>

              <div className="brand-block">
                <strong>给品牌方看的合作理由</strong>
                <p>
                  该 KOC 不是单纯曝光型账号，而是具备“真实测评—购买判断—评论追问—系列复购心智”的内容链路，适合宿舍好物、学习工具和平价生活方式品牌进行早期心智种草。
                </p>
              </div>

              <div className="notice blue">
                <strong>建议合作包</strong>
                <p>1 条真实测评图文 + 1 条评论区追问延展短视频 + 7 天数据复盘报告。</p>
              </div>

              <button
                className="btn dark full"
                onClick={() => {
                  setBrandCases(brandCases + 1);
                  show("已沉淀为品牌合作案例");
                }}
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

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f8fafc;
  color: #0f172a;
}

button, input, textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.app {
  min-height: 100vh;
  padding: 32px;
  background:
    radial-gradient(circle at top left, #dbeafe, transparent 32%),
    radial-gradient(circle at top right, #fae8ff, transparent 30%),
    #f8fafc;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.header,
.brand,
.section-head,
.actions {
  display: flex;
  align-items: center;
}

.header {
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
}

.brand {
  gap: 12px;
}

.brand p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.brand h1 {
  margin: 2px 0 0;
  font-size: 22px;
}

.logo {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #020617;
  color: white;
  display: grid;
  place-items: center;
  font-size: 22px;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
}

.hero-grid,
.two-col {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 24px;
  margin-bottom: 24px;
}

.profile-layout,
.content-layout,
.review-layout {
  grid-template-columns: 0.9fr 1.1fr;
}

.inner {
  grid-template-columns: 1fr 0.75fr;
}

.hero {
  position: relative;
  overflow: hidden;
  min-height: 330px;
  border-radius: 32px;
  background: #020617;
  color: white;
  padding: 36px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 760px;
}

.hero h2 {
  margin: 24px 0 0;
  font-size: clamp(40px, 6vw, 68px);
  line-height: 1.02;
  letter-spacing: -0.04em;
}

.hero p {
  color: #cbd5e1;
  line-height: 1.8;
  max-width: 720px;
}

.glow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 999px;
  filter: blur(70px);
}

.glow-one {
  right: -80px;
  top: -80px;
  background: rgba(217, 70, 239, 0.35);
}

.glow-two {
  left: 24%;
  bottom: -110px;
  background: rgba(34, 211, 238, 0.25);
}

.card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e2e8f0;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.card h2,
.card h3 {
  margin-top: 0;
}

.card-title {
  margin-top: 4px;
}

.muted {
  color: #64748b;
  line-height: 1.65;
}

.task-list,
.stack {
  display: grid;
  gap: 14px;
}

.small-gap {
  gap: 8px;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8fafc;
  border-radius: 18px;
  padding: 16px;
  font-size: 14px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid #e2e8f0;
  padding: 12px;
  border-radius: 26px;
  margin-bottom: 24px;
}

.step {
  border: 0;
  border-radius: 18px;
  padding: 16px;
  background: transparent;
  text-align: left;
  display: flex;
  gap: 12px;
  align-items: center;
  color: #0f172a;
}

.step span {
  font-size: 22px;
}

.step small {
  display: block;
  color: #64748b;
  margin-top: 3px;
}

.step.active {
  background: #020617;
  color: white;
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.18);
}

.step.active small {
  color: rgba(255,255,255,0.7);
}

.btn {
  border: 0;
  border-radius: 16px;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 700;
}

.btn.dark {
  background: #020617;
  color: white;
}

.btn.light {
  background: white;
  color: #020617;
}

.btn.ghost {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.16);
}

.btn.outline {
  background: white;
  color: #0f172a;
  border: 1px solid #e2e8f0;
}

.btn.cyan {
  background: #0891b2;
  color: white;
}

.btn.green {
  background: #047857;
  color: white;
  margin-top: 14px;
}

.btn.full {
  width: 100%;
}

.actions {
  gap: 12px;
  margin-top: 20px;
}

.actions.wrap {
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  background: #f1f5f9;
  color: #475569;
}

.badge-dark {
  background: rgba(255,255,255,0.14);
  color: white;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.field span {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 8px;
}

.field input,
.field textarea,
.big-textarea {
  width: 100%;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 18px;
  padding: 14px 16px;
  color: #0f172a;
  outline: none;
}

.field textarea {
  min-height: 110px;
  resize: vertical;
}

.big-textarea {
  min-height: 150px;
  margin: 20px 0 14px;
  resize: vertical;
}

.empty {
  min-height: 280px;
  border: 1px dashed #cbd5e1;
  background: #f8fafc;
  border-radius: 24px;
  display: grid;
  place-items: center;
  color: #64748b;
  text-align: center;
  padding: 28px;
}

.mini-grid,
.idea-grid,
.metrics {
  display: grid;
  gap: 14px;
}

.mini-grid {
  grid-template-columns: repeat(3, 1fr);
}

.mini-grid.two {
  grid-template-columns: repeat(2, 1fr);
}

.mini-card,
.trend,
.score-card,
.chart-card,
.metric {
  background: #f8fafc;
  border-radius: 22px;
  padding: 18px;
}

.mini-card.white {
  background: white;
  border: 1px solid #e2e8f0;
}

.mini-card small,
.metric small {
  color: #64748b;
  display: block;
  margin-bottom: 8px;
}

.mini-card strong {
  display: block;
  line-height: 1.55;
}

.big {
  font-size: 30px;
}

.notice {
  border-radius: 22px;
  padding: 18px;
  background: #f8fafc;
  line-height: 1.75;
}

.notice.green {
  background: #ecfdf5;
  color: #064e3b;
}

.notice.red {
  background: #fff1f2;
  color: #881337;
}

.notice.blue {
  background: #ecfeff;
  color: #164e63;
}

.notice.pink {
  background: #fdf4ff;
  color: #701a75;
}

.notice.yellow {
  background: #fffbeb;
  color: #92400e;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.section-head {
  justify-content: space-between;
  gap: 16px;
}

.trend p,
.idea p,
.chart-card p,
.mini-card p {
  color: #64748b;
  line-height: 1.65;
}

.idea-grid {
  grid-template-columns: repeat(2, 1fr);
}

.idea {
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 24px;
  padding: 18px;
}

.idea.active {
  background: #020617;
  color: white;
  border-color: #020617;
}

.idea.active p {
  color: rgba(255,255,255,0.72);
}

.angle {
  background: white;
  border-radius: 16px;
  padding: 12px;
  color: #475569;
  font-size: 13px;
  line-height: 1.6;
}

.idea.active .angle {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.76);
}

.score-row {
  margin-top: 14px;
}

.score-top {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 6px;
}

.score-track {
  height: 8px;
  border-radius: 999px;
  background: white;
}

.score-fill {
  height: 8px;
  border-radius: 999px;
  background: #020617;
}

.sub-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 12px;
  line-height: 1.65;
}

.action-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.action-card div {
  background: rgba(255,255,255,0.65);
  border-radius: 16px;
  padding: 12px;
  line-height: 1.65;
}

.metrics {
  grid-template-columns: repeat(6, 1fr);
  margin: 22px 0;
}

.metric strong {
  font-size: 22px;
}

.bar-chart {
  height: 180px;
  display: flex;
  align-items: end;
  gap: 16px;
  margin-top: 18px;
}

.bar-item {
  flex: 1;
  display: grid;
  gap: 8px;
  text-align: center;
}

.bar-box {
  height: 135px;
  display: flex;
  align-items: end;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 8px;
}

.bar {
  width: 100%;
  background: #020617;
  border-radius: 12px;
}

.bar-label {
  font-size: 12px;
  color: #64748b;
}

.brand-block {
  background: #020617;
  color: white;
  border-radius: 22px;
  padding: 20px;
  margin: 18px 0;
}

.brand-block p {
  color: rgba(255,255,255,0.75);
  line-height: 1.75;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  z-index: 999;
  background: #020617;
  color: white;
  padding: 12px 18px;
  border-radius: 16px;
  font-weight: 700;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.25);
}

@media (max-width: 980px) {
  .hero-grid,
  .two-col,
  .inner {
    grid-template-columns: 1fr;
  }

  .steps,
  .field-grid,
  .mini-grid,
  .mini-grid.two,
  .idea-grid,
  .metrics,
  .action-card {
    grid-template-columns: 1fr;
  }

  .app {
    padding: 18px;
  }

  .header,
  .section-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero h2 {
    font-size: 42px;
  }
}
`;
