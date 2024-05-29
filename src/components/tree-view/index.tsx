import React, { FC, useEffect, useState } from "react";
import { translate } from "../../languages";
import AffiliateService from "../../services/affiliate/affiliate.service";

function selects(obj: any, keys: any[]) {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

export function flatTreeData(input: any[]) {
  try {
    let output = [];

    const getChildren = (obj: any) => {
      if (obj && obj.children && obj.children.length > 0) {
        const { children } = obj;

        children.map((item: any) => {
          output.push({ ...item });
          getChildren(item);
          return item;
        });
      }
    };

    output.push(input);
    getChildren(input);

    output.map((item: any) => {
      delete item.children;
      return item;
    });

    return output;
  } catch (error) {
    return [];
  }
}

export const TreeView: FC<{
  affiliate: any[];
  onGetTree: (id: any) => void;
}> = (props) => {
  let [affiliation, setAffiliation] = useState(null as any);
  let [showView, setShowView] = useState<boolean>(false);

  useEffect(() => setTree(), []);

  const setTree = () => {
    // @ts-ignore
    const OrgChart: any = window ? window.OrgChart : undefined;

    if (OrgChart) {
      const { affiliate, onGetTree } = props;
      setAffiliation(affiliate);
      // console.log("affiliate",affiliate);

      const editForm: any = function () {
        editForm.nodeId = null;
      };

      editForm.prototype.init = function (obj: any) {
        const that = this;
        this.obj = obj;
        this.editForm = document.getElementById("editForm");
        this.volumeInput = document.getElementById("volume");
        this.volumeAllBranchInput = document.getElementById("volumeAllBranch");
        this.imgInput = document.getElementById("img");
        this.nameInput = document.getElementById("name");
        this.titleInput = document.getElementById("title");
        this.cancelButton = document.getElementById("close");

        this.cancelButton?.addEventListener("click", function () {
          that.hide();
        });
      };

      editForm.prototype.show = function (nodeId: any) {
        this.nodeId = nodeId;
        // var left = document.body.offsetWidth / 2 - 320;
        // this.editForm.style.left = left + "px";
        var node = chart.get(nodeId);
        if (!node) return;
        this.volumeInput.innerHTML = node.volume ? node.volume : "0";
        this.volumeAllBranchInput.innerHTML = node.volumeAllBranch ? node.volumeAllBranch : "0";
        this.imgInput.src = node.img ? node.img : "#";
        this.nameInput.innerHTML = node.name ? node.name : "";
        this.titleInput.innerHTML = node.title ? node.title : "";

        this.editForm.style.display = "block";

        setShowView(true);

        OrgChart.anim(this.editForm, { opacity: 0 }, { opacity: 1 }, 300, OrgChart.anim.inOutSin);
      };

      editForm.prototype.hide = function () {
        this.editForm.style.display = "none";
        this.editForm.style.opacity = 0;
        setShowView(false);
      };

      const data = affiliate.map((item: any) => {
        let email = item.email;
        let VIP = item.rank;
        let img = `/images/level${item.rank}.png`;
        // let fullname = item.firstName.toUpperCase() + ' ' + item.lastName.toUpperCase();
        let fullname = item.firstName + " " + item.lastName;

        return {
          // ...selects(item, ['email', 'parentId', 'level', 'volume', 'numberOfF1Agency', 'volumeAllBranch']),
          id: item.userId,
          pid: item.presenterId,
          // "Display name": fullname,
          // "Email": email,
          // "Level": level,
          // "Personal volume": item.volume,
          // "Downlines volume": item.volumeAllBranch,
          name: fullname,
          // [translate("Email")]: email,
          VIP,
          volume: item.volume,
          volumeAllBranch: item.volumeAllBranch,
          img,
        };
      });

      //[BEGIN] - customize template

      OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.olivia);
      OrgChart.templates.myTemplate.defs =
        '<marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path fill="#101827" d="M 0 0 L 10 5 L 0 10 z" /></marker>';
      OrgChart.templates.myTemplate.link =
        '<path marker-start="url(#arrow)" marker-end="url(#arrow)" stroke="#101827" stroke-linejoin="round" stroke-width="0.8px" fill="none"  d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />';
      OrgChart.templates.myTemplate.link_field_0 =
        '<text text-anchor="middle" fill="#101827" data-width="290" x="0" y="-20" style="font-size:24px;">{val}</text>';

      OrgChart.templates.myTemplate.node =
        '<rect x="0" y="0" height="40" width="300" fill="#fff" stroke-width="1" stroke="#F2F2F2" rx="20" ry="20"></rect>';
      OrgChart.templates.myTemplate.size = [300, 40];
      OrgChart.templates.myTemplate.img_0 =
        '<clipPath id="ulaImg">' +
        '<circle cx="20" cy="20" r="17"></circle>' +
        "</clipPath>" +
        '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="8" y="5" width="24" height="30">' +
        "</image>";
      OrgChart.templates.myTemplate.field_0 =
        '<text width="210" class="field_0" style="font-size: 18px;" fill="#000000cc" x="48" y="26" text-anchor="start">{val}</text>';
      OrgChart.templates.myTemplate.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,270,14)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#fff" fill-opacity="0" width="16" height="16"></rect><circle cx="0" cy="0" r="2"></circle><circle cx="0" cy="7" r="2"></circle><circle cx="0" cy="14" r="2"></circle></g>';
      OrgChart.templates.myTemplate.plus =
        '<circle cx="15" cy="15" r="10" fill="translate" stroke="#fff" stroke-width="1"></circle>' +
        '<line x1="10" y1="15" x2="20" y2="15" stroke-width="1" stroke="#fff"></line>' +
        '<line x1="15" y1="10" x2="15" y2="20" stroke-width="1" stroke="#fff"></line>';
      OrgChart.templates.myTemplate.minus =
        '<circle cx="15" cy="15" r="10" fill="#000000cc" stroke="#fff" stroke-width="1"></circle>' +
        '<line x1="10" y1="15" x2="20" y2="15" stroke-width="1" stroke="#fff"></line>';
      //[END] - customize template

      var treeIcon =
        '<svg width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M17,16l-4-4V8.82a3,3,0,1,0-2,0V12L7,16H3v5H8V17.95l4-4.2,4,4.2V21h5V16Z" transform="translate(-3 -3)" /></svg>';
      var chart: any = new OrgChart(document.getElementById("tree"), {
        template: "myTemplate",
        orientation: OrgChart.orientation.left,
        enableSearch: false,
        mode: "dark",
        nodeBinding: {
          field_0: "name",
          // field_1: translate("Email"),
          field_2: "VIP",
          field_3: "volume",
          field_4: "volumeAllBranch",
          img_0: "img",
        },
        collapse: {
          level: 1,
          // allChildren: true
        },
        mouseScrool: OrgChart?.action?.ctrlZoom,
        enableKeyNavigation: true,
        levelSeparation: 200, //The gap between each level. Default value - 60
        siblingSeparation: 20, //The gap between nodes in a subtree. Default value - 20
        subtreeSeparation: 40, //The gap between subtrees. Default value - 40
        sticky: true, //Stops the chart locking to the top of the screen once you move it.
        lazyLoading: false,
        // toolbar: {
        //     layout: true,
        //     zoom: true,
        //     fit: true,
        //     expandAll: false,
        //     fullScreen: true
        // },
        nodeMenu: {
          // x: 100,
          // y: 100,
          call: {
            text: translate("Get tree"),
            icon: treeIcon,
            onClick: (nodeId: any) => getTreeHandler(nodeId),
          },
        },
        // nodeMouseClick: OrgChart.action.edit,
        editUI: new editForm(),
        nodes: data,
      });

      chart.on("expcollclick", (sender: any, collapse: any, id: any, ids: any) => {
        collapse === 0 &&
          AffiliateService.getAffiliation(2, id)
            .then(async (res) => {
              const newRes = await res
                ?.filter((item: any) => +item?.level === +res?.[0]?.level + 2)
                ?.filter((item: any) => !data?.map((el) => el?.id)?.includes(item?.userId))
                ?.map((item: any) => {
                  let email = item.email;
                  let VIP = item.rank;
                  let img = `/images/level${item.rank}.png`;
                  // let fullname = item.firstName.toUpperCase() + ' ' + item.lastName.toUpperCase();
                  let fullname = item.firstName + " " + item.lastName;

                  return {
                    // ...selects(item, ['email', 'parentId', 'level', 'volume', 'numberOfF1Agency', 'volumeAllBranch']),
                    id: item.userId,
                    pid: item.presenterId,
                    // "Display name": fullname,
                    // "Email": email,
                    // "Level": level,
                    // "Personal volume": item.volume,
                    // "Downlines volume": item.volumeAllBranch,
                    name: fullname,
                    // [translate("Email")]: email,
                    VIP,
                    volume: item.volume,
                    volumeAllBranch: item.volumeAllBranch,
                    img,
                  };
                });

              newRes?.forEach((item: any) => {
                chart.addNode(item);
              });

              sender.center(id, {
                childrenState: OrgChart.COLLAPSE_SUB_CHILDRENS,
              });
            })

            .catch((err) => setAffiliation({ error: err.error }));
      });

      const getTreeHandler = (nodeId: any) => {
        // console.log("nodeId",nodeId);

        var nodeData = chart.get(nodeId);
        // console.log("nodeData",nodeData);
        onGetTree(nodeData.id);

        // var employeeName = nodeData["name"];
      };
    }

    // eslint-disable-next-line
  };

  if (affiliation) {
    if (affiliation?.[0]?.userId != props?.affiliate?.[0]?.userId) {
      setTree();
      setAffiliation(props?.affiliate);
    }
  }

  return (
    <div className={`TreeView`}>
      <div className={`${showView ? "showView" : "hiddenView"}`} onClick={() => setShowView(false)}>
        <div
          id="editForm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <table style={{ margin: 20, width: 300 }}>
            <tbody style={{ background: "#fff", position: "relative" }}>
              <tr style={{ position: "absolute", top: "-15px", right: "-5px" }}>
                <td colSpan={2} className="bg-none" style={{ textAlign: "right" }}>
                  <span id="close" style={{ fontWeight: 300, fontFamily: "Arial, sans-serif", cursor: "pointer" }}>
                    x
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table style={{ width: "100%" }}>
                    <tbody style={{ background: "#fff" }}>
                      <tr>
                        <td>
                          <img id="img" src="" style={{ width: 70, borderRadius: 35 }} />
                          <div id="name" style={{ fontSize: 24, fontWeight: "bold", color: "#000000cc", marginBottom: "16px" }} />
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <div id="title" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr
                style={{
                  borderTop: "1px solid #000000cc",
                  borderBottom: "1px solid #000000cc",
                }}
              >
                <td style={{ color: "#000000cc", textAlign: "left", padding: "8px 0" }}>{translate("Personal Bet")}</td>
                <td id="volume" style={{ color: "#000000cc", textAlign: "left", paddingLeft: 10 }} />
              </tr>
              <tr
                style={{
                  borderTop: "1px solid #000000cc",
                  borderBottom: "1px solid #000000cc",
                }}
              >
                <td style={{ color: "#000000cc", textAlign: "left", padding: "8px 0" }}>{translate("Downlines Volume")}</td>
                <td id="volumeAllBranch" style={{ color: "#000000cc", textAlign: "left", paddingLeft: 10 }} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="tree" style={{ height: "600px" }} />
    </div>
  );
};
