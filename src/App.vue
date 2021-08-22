<script>
import style from "./App.module.scss";
import { defineComponent, ref } from "vue";
export const useElInput = ({
  value = "",
  placeholder = "",
  width = "300px",
} = {}) => {
  const elInputValue = ref(value);
  const elInputPlaceholder = placeholder;
  const template = defineComponent({
    setup() {
      return () => (
        <el-input
          placeholder={elInputPlaceholder}
          v-model={elInputValue.value}
          style={{ width }}
        ></el-input>
      );
    },
  });
  const getValue = () => {
    return elInputValue.value;
  };
  return {
    getValue,
    template,
  };
};

const useElFormInput = ({
  label = "",
  placeholder = "",
  width = "300px",
  containerWidth = "50%",
} = {}) => {
  const elInput = useElInput({ placeholder, width });
  return {
    getValue: elInput.getValue,
    template: () => (
      <div style={{ width: containerWidth }}>
        <el-form-item label={label}>
          <elInput.template />
        </el-form-item>
      </div>
    ),
  };
};

const useElFormRadio = ({ label = "", value = "", data = [] } = {}) => {
  const elRadio = ref(value);
  const getValue = () => elRadio.value;
  return {
    getValue,
    template: () => (
      <el-form-item label={label}>
        {data.map((item) => (
          <el-radio v-model={elRadio.value} label={item.value}>
            {item.name}
          </el-radio>
        ))}
      </el-form-item>
    ),
  };
};

const useElFormTabs = ({ activeName: an, data = [] } = {}) => {
  const activeName = ref(an);
  const getValue = () => activeName.value;
  const onTabClick = () => {};
  return {
    getValue,
    onTabClick,
    template: () => (
      <el-tabs activeName={activeName}>
        {data &&
          data.map((item) => (
            <el-tab-pane label={item.value} name={item.name}>
              {item.template || <div>empty</div>}
            </el-tab-pane>
          ))}
      </el-tabs>
    ),
  };
};

const useElFormSwitch = ({
  activeText = "",
  inactiveText = "",
  value = false,
} = {}) => {
  const elSwitchValue = ref(value);
  return {
    template: () => (
      <el-form-item>
        <el-switch
          v-model={elSwitchValue.value}
          active-text={activeText}
          inactive-text={inactiveText}
        ></el-switch>
      </el-form-item>
    ),
  };
};

const ElButtonType = {
  Text: "text",
  Primary: "primary",
  Danger: "danger",
  Info: "into",
};

export const useElButton = ({
  text = "",
  type = ElButtonType.Primary,
  onClick = () => {},
} = {}) => {
  const template = defineComponent({
    setup(props, ctx) {
      return () => (
        <el-button on-click={onClick} type={type}>
          {ctx.slots.default ? ctx.slots.default() : text}
        </el-button>
      );
    },
  });
  return {
    template,
  };
};

const useSqlOption = () => {
  let inputComponents = [];
  let switchComponents = [];
  [
    "Host",
    "Port",
    "Username",
    "Password",
    "Database",
    "Include Database",
    "ConnectionTimeout",
    "RequestTimeout",
    "TimeZone",
  ].forEach((item) => {
    inputComponents.push(useElFormInput({ label: item, placeholder: item }));
  });
  [{ activeText: "SSH Tunnel" }, { activeText: "Use SSL" }].forEach((item) => {
    switchComponents.push(useElFormSwitch({ activeText: item.activeText }));
  });
  const elFormStyle = {
    inline: true,
    labelWidth: "200px",
    labelPosition: "left",
    style: { display: "flex", flexWrap: "wrap" },
  };
  return {
    template: () => (
      <>
        <el-form {...elFormStyle}>
          {inputComponents &&
            inputComponents.map((item) => {
              return <item.template />;
            })}
        </el-form>
        <el-form {...elFormStyle}>
          {switchComponents &&
            switchComponents.map((item) => {
              return <item.template />;
            })}
        </el-form>
        <div></div>
      </>
    ),
  };
};

export default {
  setup() {
    const connectionName = useElFormInput({
      label: "Connection Name",
      placeholder: "Connection name",
    });
    const connectionTarget = useElFormRadio({
      label: "Connection Target",
      value: 1,
      data: [
        {
          name: "Global",
          value: 1,
        },
        {
          name: "Current Workspace",
          value: 2,
        },
      ],
    });
    const sqlOption = useSqlOption();
    const databaseTypeTabs = useElFormTabs({
      activeName: "MySQL",
      data: [
        { name: "MySQL", value: "MySQL", template: <sqlOption.template /> },
        { name: "PostGreSQL", value: "PostGreSQL" },
        { name: "SQLite", value: "SQLite" },
        { name: "MongoDB", value: "MongoDB" },
        { name: "Redis", value: "Redis" },
        { name: "ElasticSearch", value: "ElasticSearch" },
        { name: "SSH", value: "SSH" },
        { name: "FTP", value: "FTP" },
      ],
    });
    return () => (
      <div class={style.main}>
        <div class={style.row}>
          <span class={style.mainTitle}>Connection To Database Server</span>
        </div>
        <div class={style.row}>
          <el-form inline style={{ display: "flex", flexWrap: "wrap" }}>
            <connectionName.template />
            <connectionTarget.template />
          </el-form>
        </div>
        <div class={style.row}>
          <span class={style.subTitle}>Database Type</span>
        </div>
        <div class={style.row}>
          <databaseTypeTabs.template />
        </div>
      </div>
    );
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
  background-color: rgb(30, 30, 30);
  color: white;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
