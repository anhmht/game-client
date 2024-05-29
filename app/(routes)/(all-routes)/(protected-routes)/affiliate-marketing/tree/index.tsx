import { InputText, TreeView } from "@/src/components";
import { translate } from "@/src/languages";
import { Button, CreateAlert, EAlertType, InputWraper, Message, onError, useForm } from "@/src/modules";
import AffiliateService from "@/src/services/affiliate/affiliate.service";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

type Props = {
  render: boolean;
};

export const Tree = ({ render }: Props) => {
  let [affiliation, setAffiliation] = useState(null as any);
  let [treeLists, setTreeLists] = useState([Number]);

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (render) {
      AffiliateService.getAffiliation(2, user.userId)
        .then((res) => setAffiliation({ data: res }))
        .catch((err) => setAffiliation({ error: err.error }));
      setTreeLists([user.userId]);
    }
  }, [render]);

  const { handleSubmit, getInputProps, isSubmitting } = useForm({
    structure: [
      {
        name: "DisplayName",
        validate: Yup.string().required(translate("Display name is required")),
      },
    ],
    onSubmit: async (values) => {
      await AffiliateService.getUserDetailByDisplayName(values.DisplayName)
        .then(async (res) => {
          if (res.success) {
            pushTreeLists(res.result.userId);
            await AffiliateService.getAffiliation(2, res.result.userId)
              .then((res) => {
                setAffiliation({ data: res });
              })
              .catch((err) => setAffiliation({ error: err.error }));
          } else {
            CreateAlert({
              message: "Error when search",
              type: EAlertType.ERROR,
            });
          }
        })
        .catch(onError);
    },
  });

  const onGetNewTree = (id: any, back: boolean) => {
    AffiliateService.getAffiliation(2, id)
      .then((res) => {
        setAffiliation({ data: res });
        if (!back) {
          pushTreeLists(id);
        }
      })
      .catch((err) => setAffiliation({ error: err.error }));
  };

  const onBack = () => {
    let list = treeLists;

    if (list.length > 1) {
      const back = list[list.length - 2];
      const item = list.pop();

      onGetNewTree(back, true);
    }
  };

  const pushTreeLists = (id: any) => {
    const treeList = treeLists;
    if (treeList[treeList.length - 1] != id) {
      treeList.push(id);
      setTreeLists(treeList);
    }
  };

  if (!render) return <></>;
  return (
    <>
      {/* <form className="blockLists" onSubmit={handleSubmit}>
        <div className="row form-input">
          <div className="col-md-6 col-12">
            <InputWraper inputProps={getInputProps("DisplayName")} component={InputText} placeholder={translate("Display name")} />
          </div>
          <div className="col-md-3 col-6 mb16">
            <Button label={translate("Search")} className="btnBan w-100" type="submit" />
          </div>
          <div className="col-md-3 col-6 mb16">
            <Button className="w-100" label={translate("Back")} onClick={() => onBack()} />
          </div>
        </div>
      </form> */}
      {(() => {
        if (!affiliation) return <Message type="loading" />;
        if (affiliation.error) return <Message type="error" message={affiliation.error.message} />;
        return (
          <TreeView
            onGetTree={(id: any) => {
              onGetNewTree(id, false);
            }}
            affiliate={affiliation.data}
          />
        );
      })()}
    </>
  );
};
