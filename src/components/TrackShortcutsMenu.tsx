import { PropsWithChildren, useState } from "react";
import { Track } from "react-native-track-player";
import { Menu } from "react-native-paper";
import { useRouter } from "expo-router";
import { useFavourites } from "@/store/library";
import { useQueue } from "@/store/queueStore";
import { match } from "ts-pattern";
import useAudioStore from "@/store/audioStore";
import { TouchableOpacity } from "react-native";

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>;

export const TrackShortcutsMenu = ({
  track,
  children,
}: TrackShortcutsMenuProps) => {
  const router = useRouter();
  const addToQueue = useAudioStore((state) => state.addToQueue);
  const removeFromQueue = useAudioStore((state) => state.removeFromQueue);

  const isFavourite = track.rating === 1;
  const { toggleTrackFavourite } = useFavourites();
  const { activeQueueId } = useQueue();

  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => {
    setMenuVisible(true);
  };
  const closeMenu = () => setMenuVisible(false);

  const handlePressAction = async (id: string) => {
    match(id)
      .with("add-to-favourites", () => {
        toggleTrackFavourite(track);

        if (activeQueueId?.startsWith("favourites")) {
          addToQueue(track);
        }
      })
      .with("remove-from-favourites", () => {
        toggleTrackFavourite(track);

        if (activeQueueId?.startsWith("favourites")) {
          const queue = useAudioStore.getState().queue;
          const trackToRemove = queue.findIndex(
            (queueTrack) => queueTrack.url === track.url
          );

          removeFromQueue(trackToRemove);
        }
      })
      .with("add-to-playlist", () => {
        router.push({
          pathname: "(modals)/addToPlaylist",
          params: { trackUrl: track.url },
        });
      })
      .otherwise(() => console.warn(`Unknown menu action ${id}`));
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu} style={{ padding: 4 }}>
          {children}
        </TouchableOpacity>
      }
    >
      <Menu.Item
        onPress={() =>
          handlePressAction(
            isFavourite ? "remove-from-favourites" : "add-to-favourites"
          )
        }
        title={isFavourite ? "Remove from favourites" : "Add to favourites"}
        leadingIcon={isFavourite ? "heart" : "heart-outline"}
      />
      <Menu.Item
        onPress={() => handlePressAction("add-to-playlist")}
        title="Add to playlist"
        leadingIcon="playlist-plus"
      />
    </Menu>
  );
};
