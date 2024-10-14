import { colours } from "@/constants/tokens";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { SearchBarProps } from "react-native-screens";

const defaultSearchOptions: SearchBarProps = {
  tintColor: colours.primary,
  hideWhenScrolling: true,
};

export const useNavigationSearch = ({
  searchBarOptions,
}: {
  searchBarOptions?: SearchBarProps;
}) => {
  const [search, setSearch] = useState("");

  const navigation = useNavigation();

  const handleOnChangeText: SearchBarProps["onChangeText"] = ({
    nativeEvent: { text },
  }) => {
    setSearch(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);

  return search;
};
