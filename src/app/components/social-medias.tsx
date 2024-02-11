import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlusCircle } from "lucide-react";
import { DraggableList } from "@/app/components/draggable-list";
import { useCallback, useEffect, useState } from "react";
import { ISocialMedia } from "../interfaces/social-media";
import { AddSocialMedia } from "./add-social-media";
import { EditSocialMedia } from "./edit-social-media";
import { http } from "@/lib/api";

export function SocialMedias() {
  const [medias, setMedias] = useState<ISocialMedia[]>([]);
  const [isEditing, setIsEditing] = useState<Record<number, boolean>>({});

  const getMedias = useCallback(() => {
    http.get("social-medias").then(({ data }) => setMedias(data));
  }, []);

  useEffect(() => {
    getMedias();
  }, [getMedias]);

  const openEdit = (id: number) => setIsEditing({ ...isEditing, [id]: true });
  const closeEdit = (id: number) => setIsEditing({ ...isEditing, [id]: false });

  const onReorderMedias = async (medias: ISocialMedia[]): Promise<void> => {
    setMedias(medias);

    const payload = medias.map((media, i) => ({ id: media.id, order: i + 1 }));

    await http.put("social-medias/ordering", payload);
  };

  const onSaveMedia = (id: number) => {
    closeEdit(id);
    getMedias()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Medias</CardTitle>
      </CardHeader>
      <CardContent>
        <AddSocialMedia onSave={() => getMedias()}>
          <Button className="w-full mb-4">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Social Media
          </Button>
        </AddSocialMedia>

        <div className="flex gap-2">
          <DraggableList
            droppableId="social-medias"
            data={medias}
            onReorder={(medias) => onReorderMedias(medias)}
            renderItem={(media, provided) => (
              <>
                <Card
                  key={media.id}
                  ref={provided?.innerRef}
                  {...provided?.dragHandleProps}
                  {...provided?.draggableProps}
                  onClick={() => openEdit(media.id)}
                >
                  <CardContent className="p-5 flex items-center justify-center relative ">
                    <FontAwesomeIcon
                      icon={[media.icon.family, media.icon.icon]}
                      className="h-5 w-5"
                    />
                    <span className="sr-only">Notifications</span>
                    <div
                      className={cn(
                        "absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white  border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900",
                        media.active ? "bg-green-500" : "bg-red-500"
                      )}
                    ></div>
                  </CardContent>
                </Card>

                {isEditing[media.id] && (
                  <EditSocialMedia
                    media={media}
                    onSave={() => onSaveMedia(media.id)}
                    isOpen={true}
                    onClose={() => closeEdit(media.id)}
                  />
                )}
              </>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
